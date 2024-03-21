import 'dotenv/config';
import { constants, Contract, providers } from 'ethers';
import { concat } from 'ethers/lib/utils';
import { scrollChainAbi, abi } from './abis';

// The process here is a bit convoluted. We need to get the last finalized batch

async function main() {
  const storage = constants.HashZero;
  const account = process.env.L2_ACCOUNT;

  // Note that currently, the public rpc does not support `eth_getProof` method.
  const l1provider = new providers.JsonRpcProvider(process.env.L1_PROVIDER_URL);
  const l2provider = new providers.JsonRpcProvider(process.env.L2_PROVIDER_URL);

  // console.log(2, { account, storage });

  // Step 1: Getting finalized batch number.
  // TODO: Just read this directly from L1 contract: https://sepolia.etherscan.io/address/0x2D567EcE699Eabe5afCd141eDB7A4f2D0D6ce8a0#readProxyContract

  // get the finalized block number
  const block = await l2provider.send('eth_getBlockByNumber', [
    'finalized',
    false,
  ]);
  const blockNo = Number(block.number);
  // console.log(21, { blockNo });

  // get the batch index given the block number
  // scroll mainnet url: https://mainnet-api-re.scroll.io/api/search
  const searchUrl = 'https://sepolia-api-re.scroll.io/api/search';
  const fetch = require('node-fetch');
  const resp = await fetch(`${searchUrl}?keyword=${blockNo}`);
  const obj = await resp.json();
  const batchIndex = obj.batch_index;
  // console.log(22, { batchIndex });

  // Step 2: Get a storage proof from the RPC

  const proof = await l2provider.send('eth_getProof', [
    account,
    [storage],
    block.number,
  ]);
  // console.log(3, JSON.stringify(proof, null, 2));
  const accountProof: Array<string> = proof.accountProof;
  const storageProof: Array<string> = proof.storageProof[0].proof;
  // console.log(4, { accountProof });
  // console.log(5, { storageProof });

  // Format proofs into format verifyStateCommitment wants
  const compressedProof = concat([
    `0x${accountProof.length.toString(16).padStart(2, '0')}`,
    ...accountProof,
    `0x${storageProof.length.toString(16).padStart(2, '0')}`,
    ...storageProof,
  ]);

  let hexProof = '0x' + Buffer.from(compressedProof).toString('hex');
  // console.log(6, { compressedProof });
  // console.log(62, hexProof);

  // Step 3: Test Verification

  const verifier = new Contract(
    process.env.VERIFIER_CONTRACT || '',
    abi,
    l1provider
  );

  console.log('Testing verifyStateCommitment: ', {
    batchIndex,
    account,
    storage,
    hexProof,
  });

  // This will be used to check whether the compressedProof is valid under the batch whose hash is `batchHash`.
  console.log(
    'Verified State Value: ',
    await verifier.callStatic.verifyStateCommitment(
      batchIndex,
      account,
      storage,
      compressedProof
    )
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

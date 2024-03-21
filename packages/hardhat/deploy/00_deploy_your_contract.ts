import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a contract named "YourContract" using the deployer account and
 * constructor arguments set to the deployer address
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployYourContract: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  /*
    On localhost, the deployer account is the one that comes with Hardhat, which is already funded.

    When deploying to live networks (e.g `yarn deploy --network goerli`), the deployer account
    should have sufficient balance to pay for the gas fees for contract creation.

    You can generate a random account with `yarn generate` which will fill DEPLOYER_PRIVATE_KEY
    with a random private key in the .env file (then used on hardhat.config.ts)
    You can run the `yarn account` command to check your balance in every network.
  */
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // start with verifier so we can init other contract with address
  // const verifiers = await readdir("contracts/verifiers");
  const contractName = "KnowDifferentNumbers.sol";

  // for (const contractName of verifiers) {
  const verifierName = "Verifier" + contractName.replace(".sol", "");
  await deploy(verifierName, {
    from: deployer,
    // Contract constructor arguments
    args: [],
    contract: `contracts/verifiers/${contractName}:UltraVerifier`,
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });
  // }

  const verifier = await hre.ethers.getContract<Contract>(verifierName);
  const verifierAddress = await verifier.getAddress();

  await deploy("ProofGatedValueSetter", {
    from: deployer,
    // Contract constructor arguments
    args: [verifierAddress],
    log: true,
    // autoMine: can be passed to the deploy function to make the deployment process faster on local networks by
    // automatically mining the contract deployment transaction. There is no effect on live networks.
    autoMine: true,
  });

  // Get the deployed contract to interact with it after deploying.
  const proofGatedValueSetter = await hre.ethers.getContract<Contract>("ProofGatedValueSetter", verifierAddress);
  console.log("👋 Initial value:", await proofGatedValueSetter.secureValue());
  console.log("👋 Contract address:", verifierAddress);
};

export default deployYourContract;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags YourContract
deployYourContract.tags = ["YourContract"];

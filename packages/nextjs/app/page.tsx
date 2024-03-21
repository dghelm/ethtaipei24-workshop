"use client";

import Link from "next/link";
import { ContractUI } from "./debug/_components/contract";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { BugAntIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { CircuitUI } from "~~/components/noir";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex flex-col items-center flex-grow pt-10">
        <div className="px-5">
          <h1 className="text-center">
            {/* <span className="block mb-2 text-2xl">asdf to</span> */}
            <span className="block text-4xl font-bold">L2 as ZK Coprocessor</span>
          </h1>
          <div className="flex items-center justify-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
          <hr />
          <p className="text-lg text-center">
            First, we need to prove we know 2 numbers. This proof will be generated in the browser.
          </p>
          <p className="text-lg text-center">
            <CircuitUI circuitName="KnowDifferentNumbers" />
          </p>
          <hr />
          <p className="text-lg text-center">
            Next, we&rsquo;ll set a new value while passing along our proof and the public inputs.
          </p>
          <p className="text-lg text-center">
            <ContractUI contractName="ProofGatedValueSetter" />
          </p>
          <p className="text-xs text-left w-80">
            Example Values:
            <ul>
              <li>
                <pre>
                  0x1f53b79d141abd183eaa3047258872e9d5040e1b8787fd4e790671c3d12b2e532fd64cc413de96810c43fe76dfc608e41ab3e6d68bf60bce5a8d8c8a861073f5071cbfcd2fd14395c55b11fccd318e4737cfaf18d0caaa99c14c67843371d97b292e3aabba3b63a5f5c4c5e56ee4f1bcacb69a633996d5e66f8f681b560c91de0370f36031714a24b95e540774a4c9f8bf7d9990ec276c866d5d45fe7f23881922087e118170a6cde7563c57f55d427a0930b2f326447b91cf4e2d320348a01f17d774cf1ea227e72eb3e273a3674e3eb1d91e99f412404434aea3ee09c4c25707a65b0c91123bb3411e7a8760ab02eeaaf979fc52e82f325095a71cdfc901df29c267bb6087065b94a9fad0da2b54e325aa4c0861a7b18c48cdeb424991942f00db2dd753431c04b317d6031c74dd8a0c2420597555f61a78e3bcad4ef0f1d821eb31a47a46d10394403fc623e9163277f80d41bb78cce99cb666e7f51d9b8329011a3ff8efa7c2f271708e75f43ccf5b1a17a466fc50329fe1cf52607586cf17f46edaa9db8b3ac171fbf8857d8f9221a58f8acfc9ef494a0b14c70fffbb791da4074d288b18117372610400d6cbdd9525f566f2e491d1f4f9da2448f37a2d008009f49a3d53de8969d02c4c43c4b55af7447976baeb379fa11242c4accfb71730236519c5676c74501c6219c428a8cdb21ff96adc9c7abeb9aba6d299079610c4a5f926f9b3fe21594b995e9e534c8d6b87132f15b5e2fbc58cd6c5109a0928b5b4cf767ad5389d7d6149c78fa312ffa8a144e5c95ebae6a377d2f9d0ba7800989a4421b92d091b7a733bf2534f5dc70349ee235000e9ed44d096b1fe27701eb4a24bc857f7e5654188ce6552c291ed21b764aa369b422d765f58f435cd9c1c2f52bad95f64f6c151768cf72e92427337e3fc81e42474ce22cc3afa89f16f0edc82a4ee9baee5968c4f044b2904ff840b82733841739da64ee316fd33a1c20f72f59a6dfb6a7bfd01c3c767043bc99660fc69c39682abf0d9ba02c71969a30b22600037c85559f65e366991161c90d62dc1648424ff49a56d7945f311a3f8011116a2d8e98c3060f90e8c153f1c05f21587f584ecf9726d3992e1f97075a11ef96cd0e4e5673e8c436fe1cd3016a4c53ffeace33c4b1f615ebc47a55cd7701e4cbec0a3b1dcd83b5157af383820490d7dc31273eab567fb0db66607f97d261f8b669b4fb1770774f4a48b192f2e0a4469c1585c4af0e6e94bba82e516fcef004aacb3b52ef142e0cc5112078049be5beee413fce15141452c090b2969a5d708f309aa49d69dc14d030c367bc4cfb32abf351f75eaddee28e17757fc9bbdf10f981fbe9ff257e33eb7075823a38cfb065c3ca7bf76b19b3360de93d554a4160970f295c839ac10d602b0c711956047d9d7c1f81155454e75f318e6991d78a40389e3d5db9a9292f13cc0d91fbd0b8348b71f09c358d98d64775bfb551e590e2ef54f7a7d0dba3e57e5ae0e03a63c4aefffb4fa58549f52130857ab037b5d9b1dd8087be0f653985ddb447ab1230035a2a4f7e539bb088028137c10f2f0313623c161a7994142cca0fe8d34001343feed558bee05feba9a35bb749a9e7c6ed604b7da727a236e1941a65676d4fc0f59b6497eb7af212211db49cff9c6d32168054ed5c0c967dbdc69db2145af9b9144ed12ae8ea505465416b309f8ffad859505e5d10f18ac499f920fec148a3b133023dbde659ae96a96521c43f83887e9c200e11a07d9a37cb788e7e41456e522dc70af9494a38b79b5ab678d5c90ea1f3a2980a2e585f3c8d31066861d6ff2d233b917042fad1084fdcf7cbf8c8d79421b056f0f713c37239e1e2e466cca5efc295885884707937e9b17bd13655ba1dda711ac9da6624290b9b82d57f89cf15491c46eae8597403441b867cd6ced8347a60713c7abb7352525e27981b23f7a1706916e3e1386b1b31ac8eeb7f6aa3cb21c07aac2fa067992e90aae4c811a1998f1c8376dea7c95d75d0457f1f5e31716490841be4855be00ac32e3174ff4b91adcff009dc17279fb9f3fc12bf51bf17a7608d8b996a5026e6f5b17e21ecf589cc835c9cd98685e1fe17b2a65f454cbdea3067ccc5d67f0b762ba44b6e364da951b5aa50e3c90cd8ed88d857df771624def22b03bb0b9a5bd684882fe66ec21c014013d826e278485422c5565fe8b0bf0f1209be7b282e0ad18d4d3512c0c060cba6f6731e06257a5f9faad5f64df86946009a7ae5c4f857538a6b129e49a9a13778d0b9f1418aca6b0910e2f6ff6b7f13b172db6e2f5fbf1cd5b85bf7bf38669794fa8513ff8be64edab4e782b4d7581db21bc922607a24f3098db32495f460ddcb7c77f79ec7c3c382d7c143427e9b1d40f6a5100f2205410bd9fcd5e8a3a45cd286de7b483c918fdee3321485f757edc063f1df0df25ed7ab6b2afa872cabda1ea084f86fbe377fa70d18caac35d264d0514e460587ca8dca328f2324ebc65061e6b5c861466e3f96c670f208972babe00e67259ef253fa0dbd19226707bbecfad0c18d2502b8ce4c1ac73172a02ae0304777d93bd6343272ef23661503a6d33cc3c91b59597a6ba4268155f0257ab900250449722a0577493e9fcbbf15d40925b8f57302c16b70f13dc95b0fa33a80815f42dc5fb6dd207bed90f79da66d847b803f8300759af393c65938cb78d14f407a717702ffbc37a7bfb0edc816ef783f9f2ff7134b8ada2eacd6351cc2e2c0829be4f8d45bb5516f16d53f5a9f86f1d6415eefadbd11c9ddd1728aad0cf431d1b7139377a494689ae8f535851008e59a604f63c09301b078b7ef86fe5705a3101d3fce981e14e7913764352b26baa378b4876da6a00aa10eb73dfeeb555aa301f9723707519858bc67915b3ae9a8b410796151ac2d37195c0e443980e30b12e11d3523c13dd68f94bdfd9cc695097c54f8ec26dd1acd1472305208986ae86b504f9f895a41d8d8e0c47819eafe9ec6b5ce5af472928df103ce6510c649ceede
                </pre>
              </li>
              <li>
                <pre>[&quot;0x0000000000000000000000000000000000000000000000000000000000000004&quot;]</pre>
              </li>
            </ul>
          </p>
          <hr />
          <p className="text-lg text-center">
            Now, we&rsqu;ll call a contract that verifies this piece of L2 state on L1 and caches it for later reference
            on L1.
          </p>
          <p className="text-lg text-center">
            TODO: Build this and figure out how to make it work as multi-network deployment and dapp.
            {/* <ContractUI contractName="ProofGatedValueSetter" /> */}
          </p>
        </div>

        <div className="flex-grow w-full px-8 py-12 mt-16 bg-base-300">
          <div className="flex flex-col items-center justify-center gap-12 sm:flex-row">
            <div className="flex flex-col items-center max-w-xs px-10 py-10 text-center bg-base-100 rounded-3xl">
              <BugAntIcon className="w-8 h-8 fill-secondary" />
              <p>
                Tinker with your smart contract using the{" "}
                <Link href="/debug" passHref className="link">
                  Debug Contracts
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col items-center max-w-xs px-10 py-10 text-center bg-base-100 rounded-3xl">
              <MagnifyingGlassIcon className="w-8 h-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;

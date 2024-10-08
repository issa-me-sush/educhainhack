// import { useEffect, useState } from "react";
// import { EAS, Offchain, SchemaEncoder, SchemaRegistry, TransactionSigner, getSchemaUID } from "@ethereum-attestation-service/eas-sdk";
// import { SmartAccountSigner } from "permissionless/accounts";
// import { ENTRYPOINT_ADDRESS_V07, SmartAccountClient, providerToSmartAccountSigner } from "permissionless";
// import { ENTRYPOINT_ADDRESS_V07_TYPE } from "permissionless/types/entrypoint";
// import { KernelAccountClient, createKernelAccount, createKernelAccountClient } from "@zerodev/sdk";
// import { baseSepolia } from "viem/chains";
// import { easAbi } from "./easAbi";
// import { useWallets } from "@privy-io/react-auth";
// import { signerToEcdsaValidator } from "@zerodev/ecdsa-validator";
// import { createPimlicoPaymasterClient, createPimlicoBundlerClient } from "permissionless/clients/pimlico";
// import { createPublicClient, decodeErrorResult, http } from "viem";
// import useUserWallets from "./useUserWallets";
// import { schema } from "../constants/constants";
// import { createSmartAccountClient } from "permissionless"
// import { signerToSimpleSmartAccount } from "permissionless/accounts"
// import { openCampusCodex } from "../utils/educhain";
// import { getContract, parseEther } from "viem"
// import { privateKeyToAccount } from "viem/accounts"
// const BUNDLER_PAYMASTER_URL = process.env.NEXT_PUBLIC_BUNDLER_PAYMASTER_RPC as string;
// const BUNDLER_URL = process.env.NEXT_PUBLIC_BUNDLER_URL as string;
// const PAYMASTER_URL = process.env.NEXT_PUBLIC_PAYMASTER_URL as string;
// const jiffyscanKey = process.env.NEXT_PUBLIC_JIFFYSCAN_API_KEY as string;
// const publicClient = createPublicClient({
//     transport: http("https://rpc.open-campus-codex.gelato.digital"),
// })

// const paymasterClient = createPimlicoPaymasterClient({
//     entryPoint: ENTRYPOINT_ADDRESS_V07,
//     transport: http(PAYMASTER_URL, {
//                     fetchOptions: {
//                         headers: { "x-api-key": jiffyscanKey },
//                     },
//                 }),
// })

// const pimlicoBundlerClient = createPimlicoBundlerClient({
//     transport: http(BUNDLER_URL, {
//                     fetchOptions: {
//                         headers: { "x-api-key": jiffyscanKey },
//                     },
//                 }),
//     entryPoint: ENTRYPOINT_ADDRESS_V07,
// })

// const schemaRegistryContractAddress = "0xa5B27215410c4bb50e3Be57E5add89b0089Aa358"; // opencampus-codex
// const schemaRegistry = new SchemaRegistry(schemaRegistryContractAddress);
// // const resolverAddress = "0x4200000000000000000000000000000000000020"; // 
// const eas = "0x804199DD6A63e70424Db203b1Fa26b2FaaC1DC97" as `0x${string}`; // opencampus-codex
// const revocable = false;

// const useEas = () => {
//     // const [accountClient, setAccountClient] = useState<null | KernelAccountClient<ENTRYPOINT_ADDRESS_V07_TYPE>>(null);
//     const [accountClient, setAccountClient] = useState<null | SmartAccountClient<ENTRYPOINT_ADDRESS_V07_TYPE>>(null);
//     const { wallets } = useWallets();

//     // useEffect(() => {
//     //     const attest = async () => {
//     //         console.log("account client", accountClient);
//     //         await attestSchema();
//     //     };
//     //     attest();
//     // }, [accountClient]);
//     useEffect(() => {
//         const initializeAccount = async () => {
//             try {
//                 // Find the embedded wallet and get its EIP1193 provider
//                 const embeddedWallet = wallets.find((wallet) => wallet.walletClientType === "privy");
//                 if (!embeddedWallet) {
//                     console.error("Embedded wallet not found");
//                     return;
//                 }
//                 const provider = await embeddedWallet.getEthereumProvider();

//                 // Use the EIP1193 `provider` from Privy to create a `SmartAccountSigner`
//                 // @ts-ignore
//                 const smartAccountSigner = await providerToSmartAccountSigner(provider);

//                 // Initialize a viem public client on your app's desired network
//                 // const publicClient = createPublicClient({
//                 //     transport: http(baseSepolia.rpcUrls.default.http[0]),
//                 // });

//                 // Create a ZeroDev ECDSA validator from the `smartAccountSigner` from above and your `publicClient`
//                 // @ts-ignore
//                 // const ecdsaValidator = await signerToEcdsaValidator(publicClient, {
//                 //     signer: smartAccountSigner,
//                 //     entryPoint: ENTRYPOINT_ADDRESS_V07,
//                 //     kernelVersion: "0.3.0",
//                 // });

//                 // Create a Kernel account from the ECDSA validator
//                 // @ts-ignore
//                 // const account = await createKernelAccount(publicClient, {
//                 //     plugins: {
//                 //         sudo: ecdsaValidator,
//                 //     },
//                 //     entryPoint: ENTRYPOINT_ADDRESS_V07,
//                 //     kernelVersion: "0.3.0",
//                 // });


//                 // const paymasterClient = createPimlicoPaymasterClient({
//                 //     transport: http(BUNDLER_PAYMASTER_URL),
//                 //     entryPoint: ENTRYPOINT_ADDRESS_V07,
//                 // });

//                 // const pimlicoBundlerClient = createPimlicoBundlerClient({
//                 //     transport: http(BUNDLER_PAYMASTER_URL),
//                 //     entryPoint: ENTRYPOINT_ADDRESS_V07,
//                 // });

//                 // const kernelClient = createKernelAccountClient({
//                 //     account,
//                 //     // @ts-ignore
//                 //     chain: baseSepolia,
//                 //     entryPoint: ENTRYPOINT_ADDRESS_V07,
//                 //     bundlerTransport: http(BUNDLER_PAYMASTER_URL),
//                 //     middleware: {
//                 //         sponsorUserOperation: paymasterClient.sponsorUserOperation, // optional
//                 //         gasPrice: async () => (await pimlicoBundlerClient.getUserOperationGasPrice()).fast, // use pimlico bundler to get gas prices
//                 //     },
//                 // });
//                 const simpleAccount = await signerToSimpleSmartAccount(publicClient, {
//                     signer: smartAccountSigner,
//                     entryPoint: ENTRYPOINT_ADDRESS_V07,
//                     factoryAddress: "0x91E60e0613810449d098b0b5Ec8b51A0FE8c8985",
//                 })
//                 const smartAccountClient = createSmartAccountClient({
//                     account: simpleAccount,
//                     entryPoint: ENTRYPOINT_ADDRESS_V07,
//                     chain: openCampusCodex,
//                     bundlerTransport: http(BUNDLER_URL, {
//                     fetchOptions: {
//                         headers: { "x-api-key": jiffyscanKey },
//                     },
//                 }),
//                     middleware: {
//                         sponsorUserOperation: paymasterClient.sponsorUserOperation, // optional
//                         gasPrice: async () => (await pimlicoBundlerClient.getUserOperationGasPrice()).fast, // if using pimlico bundler
//                     },
//                 })
//                 // setAccountClient(kernelClient);
//                 setAccountClient(smartAccountClient)

//                 // console.log("smart wallet address :", account.address);
//                 console.log("smart wallet address :", simpleAccount.address);
//             } catch (error) {
//                 console.error("Error initializing account:", error);
//             }
//         };

//         initializeAccount();
//     }, [wallets]);

//     // const attestSchema = async (github_url: string, maintainer_github_id: string, remark: string, contributor_github_id: string) => {
//     //     const tx = await attestSchemaInBlockchain(github_url, maintainer_github_id, remark, contributor_github_id);
//     //     if (tx !== undefined) {
//     //         console.log("Transaction successful, tx:", tx);

//     //     }
//     // };

//     // useEffect(() => {
//     //     const attest = async () => {
//     //         console.log("account client", accountClient);
//     //         // await attestSchemaInBlockchain("tset", "test", "test", "test");
//     //     };
//     //     if (accountClient) {
//     //         attest();
//     //     }
//     // }, [accountClient]);

//     const attestSchemaInBlockchain = async (
//         github_url: string,
//         maintainer_github_id: string,
//         remark: string,
//         contributor_github_id: string
//     ) => {
//         console.log(contributor_github_id);
//         const walletResponse = await fetch(`/api/getUsersAddress?username=${contributor_github_id}`);
//         if (!walletResponse.ok) {
//             throw new Error(`API responded with status: ${walletResponse.status}`);
//         }

//         const walletText = await walletResponse.text();
//         if (!walletText) {
//             throw new Error("Empty response body");
//         }

//         const walletData = JSON.parse(walletText);

//         console.log(walletData);

//         // let schema = "string github_url,string maintainer_github_id,string remark,string contributor_github_id";
//         // let schemaEncoded =
//         console.log(
//             "error",
//             decodeErrorResult({
//                 abi: easAbi,
//                 data: "0x157bd4c3",
//             })
//         );
//         const schemaEncoder = new SchemaEncoder(schema);
//         // const schemaUID = getSchemaUID(schema, "0x0000000000000000000000000000000000000000", false) as `0x${string}`;
//         const schemaUID = "0x77525ac84dee48aae1f655ca3285169ca0adfc435a4852388ddd50e66c90a1ef"

//         console.log("schemaUID", schemaUID);
//         console.log(github_url, maintainer_github_id, remark, contributor_github_id);
//         const data = schemaEncoder.encodeData([
//             { name: "github_url", value: github_url, type: "string" },
//             { name: "maintainer_github_id", value: maintainer_github_id, type: "string" },
//             { name: "remark", value: remark, type: "string" },
//             { name: "contributor_github_id", value: contributor_github_id, type: "string" },
//         ]) as `0x${string}`;
//         if (!accountClient) {
//             console.error("Account client not found");
//             return;
//         }
//         try {
//             const tx = await accountClient.writeContract({
//                 account: accountClient.account ? accountClient.account : "0x",
//                 address: eas,
//                 chain: openCampusCodex,
//                 abi: easAbi,
//                 functionName: "attest",
//                 args: [
//                     {
//                         schema: schemaUID,
//                         data: {
//                             // @ts-ignore
//                             recipient: walletData[0].smart_contract_address,
//                             expirationTime: BigInt("1729782120075"),
//                             revocable: false,
//                             refUID: "0x0000000000000000000000000000000000000000000000000000000000000000",
//                             data: data,
//                             value: BigInt("0"),
//                         },
//                     },
//                 ],
//             });

//             console.log("Transaction successful, tx:", tx);
//             // @ts-ignore  - getting uid
//             const receipt = await tx.wait(); // Wait for the transaction to be mined
//             console.log("tx receipt",receipt)

//             const attestationUID = receipt.logs[0].topics[2];

//             //tracking uid
//             const response = await fetch('/api/addUid', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify({ uid: attestationUID }),
//             });

//             const result = await response.json();
//             console.log("Backend response:", result);

//             return tx;
//         } catch (error) {
//             console.error("An error occurred while writing the contract:", error);
//         }
//     };
//     return { attestSchemaInBlockchain, setAccountClient, accountClient };
// };

// export default useEas;

// import '../styles/globals.css';
// import '@rainbow-me/rainbowkit/styles.css';
// import type { AppProps } from 'next/app';

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// import { WagmiProvider ,createConfig,http} from 'wagmi';
// import {PrivyProvider} from '@privy-io/react-auth';
// import {
//   arbitrum,
//   base,
//   baseSepolia,
//   mainnet,
//   optimism,
//   polygon,
//   sepolia,
// } from 'wagmi/chains';
// import { getDefaultConfig, RainbowKitProvider,connectorsForWallets } from '@rainbow-me/rainbowkit';
// import { coinbaseWallet } from '@rainbow-me/rainbowkit/wallets';
// // Enable Coinbase Smart Wallet for testing
// coinbaseWallet.preference = 'smartWalletOnly';
// const connectors = connectorsForWallets(
//   [
//     {
//       groupName: 'Recommended',
//       wallets: [coinbaseWallet],
//     },
//   ],
//   {
//     appName: 'My RainbowKit App',
//     projectId: '8bfb5108a6332499700ca9e62adf9b84',
//   }
// );
// const config = createConfig({
//   chains: [baseSepolia, sepolia],
//   ssr: true,
//   transports: {
//     [baseSepolia.id]: http('https://base-sepolia-rpc.publicnode.com'),
//     [sepolia.id]: http('https://sepolia.drpc.org'),
//   },
//   connectors: connectors
// })

// const client = new QueryClient();

// function MyApp({ Component, pageProps }: AppProps) {

//   return (
//     <WagmiProvider config={config}>
//       <QueryClientProvider client={client}>
//         <RainbowKitProvider>
//           <Component {...pageProps} />
//         </RainbowKitProvider>
//       </QueryClientProvider>
//     </WagmiProvider>
//   );
// }

// export default MyApp;

import "../styles/globals.css";
import { Toaster } from "../components/ui/toaster"
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PrivyProvider } from "@privy-io/react-auth";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";
import { mainnet, sepolia, base, baseSepolia, optimism, polygon, arbitrum } from "viem/chains";
import { http } from "wagmi";
import { PrivyClientConfig } from "@privy-io/react-auth";
import NavBar from "../components/nav";
import { openCampusCodex } from "../utils/educhain";
export const privyConfig: PrivyClientConfig = {
  embeddedWallets: {
    createOnLogin: 'users-without-wallets',
    requireUserPasswordOnCreate: false,
    noPromptOnSignature: false,
  },
  loginMethods: [ 'github'],
  supportedChains: [openCampusCodex],
  defaultChain: openCampusCodex

};

const wagmiConfig = createConfig({
           // @ts-ignore 
      chains: [ openCampusCodex],
      ssr: true, 
      transports: {
        [openCampusCodex.id]: http('https://rpc.open-campus-codex.gelato.digital'),
       
      },
});

const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID as string;
console.log("appId", appId);
const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <PrivyProvider appId={appId} config={privyConfig}>
            <QueryClientProvider client={queryClient}>
                <WagmiProvider config={wagmiConfig}>
                    <>
                    <Toaster />
                        <NavBar />
                        <Component {...pageProps} />
                    </>
                </WagmiProvider>
            </QueryClientProvider>
        </PrivyProvider>
    );
}

export default MyApp;

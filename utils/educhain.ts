import {defineChain} from 'viem';

export const openCampusCodex = defineChain({
  id: 656476, // Replace this with your chain's ID
  name: 'open-campus-codex',
  network: 'open-campus-codex',
  nativeCurrency: {
    decimals: 18, // Replace this with the number of decimals for your chain's native token
    name: 'EDU',
    symbol: 'EDU',
  },
  rpcUrls: {
    default: {
      http: ['https://open-campus-codex-sepolia.drpc.org'],
      webSocket: ['wss://open-campus-codex-sepolia.drpc.org'],
    },
  },
  blockExplorers: {
    default: {name: 'Codex Explorer', url: 'https://opencampus-codex.blockscout.com/'},
  },
});
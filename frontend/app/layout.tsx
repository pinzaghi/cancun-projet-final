'use client'
 
// These styles apply to every route in the application
import './globals.css'
 
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import {
  foundry, sepolia
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';

const { chains, publicClient } = configureChains(
  [foundry, sepolia],
  [
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: 'FreeNearMe',
  projectId: process.env.NEXT_PUBLIC_WALLETCONNECTID,
  chains
});

const wagmiConfig = createConfig({
  autoConnect: false,
  connectors,
  publicClient
})

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <head>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          <link rel="shortcut icon" href="/static/favicon.svg" />
        </head>
        <body>
          <main className="flex-1 space-y-4 p-8 pt-6">
          <WagmiConfig config={wagmiConfig}>
              <RainbowKitProvider chains={chains}>
              {children}
              </RainbowKitProvider>
            </WagmiConfig>
          </main>
        </body>
      </html>
    )
}
<div align="center">
  <img src="https://raw.githubusercontent.com/spling-labs/social-protocol-react-native-template/main/assets/spling_header.jpg" />

  <h1>Social Protocol</h1>
   <p>
    <a href="https://spling-labs.github.io/social-protocol/"><img alt="Docs" src="https://img.shields.io/badge/docs-typedoc-blueviolet" /></a>
    <a href="https://www.npmjs.com/package/@spling/social-protocol"><img alt="Version" src="https://img.shields.io/npm/v/@spling/social-protocol"/></a>
    <a href="https://www.npmjs.com/package/@spling/social-protocol"><img alt="Downloads" src="https://img.shields.io/npm/dm/@spling/social-protocol" /></a>
    <img alt="License" src="https://img.shields.io/npm/l/@spling/social-protocol" />
 </p>
</div>

Spling Labs - Social Protocol for building a solana on-chain social media platform.

If you have any questions about the SDK, join our [Discord](https://discord.gg/7e3QN3Hy64) to get help!

## Quick Setup

### Install

Install these dependencies over:

npm:
```shell
npm install @spling/social-protocol
```

If you plan to install the package in your react.js or next.js project, keep in mind that you need to install this package with the --no-optiona flag:
```shell
npm install @spling/social-protocol --no-optional
```

### Setup (React Example)

```tsx
import React, { useEffect } from 'react'
import * as anchor from '@project-serum/anchor'
import { SocialProtocol } from '@spling/social-protocol'
import { AnchorWallet, useWallet, Keypair } from '@solana/wallet-adapter-react'

export default function SocialProtocol() {
  const wallet = useWallet()

  useEffect(() => {
    ;(async () => {
      if (wallet?.publicKey) {
        const payerWallet: Keypair = Keypair.generate()
        const options = { 
          rpcUrl: "https://api.mainnet-beta.solana.com/", 
          useIndexer: true
        } as ProtocolOptions

        // Initialize the social protocol
        const socialProtocol = await new SocialProtocol(wallet, payerWallet, options).init()

        // You can call now functions like:
        const user = await socialProtocol.getUser(42) 
      }
    })()
  }, [wallet?.publicKey])
  return <div></div>
}
```

### Setup (React Native Example)

```tsx
import React, { useEffect } from 'react'
import { SocialProtocol } from '@spling/social-protocol'
import { Keypair } from "@solana/web3.js";

export default function SocialProtocol() {
  useEffect(() => {
    ;(async () => {
      const wallet: Keypair = Keypair.generate()
      const payerWallet: Keypair = Keypair.generate()
      const options = { 
        rpcUrl: "https://api.mainnet-beta.solana.com/", 
        useIndexer: true
      } as ProtocolOptions

      // Initialize the social protocol
      const socialProtocol = await new SocialProtocol(wallet, payerWallet, options).init()

      // You can call now functions like:
      const user = await socialProtocol.getUser(42) 
    })()
  }, [])
  
  return <View></View>;
}
```

### Setup (NodeJS Example)

```js
import { SocialProtocol } from '@spling/social-protocol'
const wallet: Keypair = Keypair.generate()
const payerWallet: Keypair = Keypair.generate()
const options = { 
  rpcUrl: "https://api.mainnet-beta.solana.com/", 
  useIndexer: true
} as ProtocolOptions

// Initialize the social protocol
const socialProtocol = await new SocialProtocol(wallet, payerWallet, options).init()

// You can call now functions like:
const user = await socialProtocol.getUser(42) 
```

### Starter templates
The starter template makes it easier for all developers to get started with their first on-chain social app. With the template you can directly start to develop your next social app based on our social protocol! [@spling/social-protocol](https://www.npmjs.com/package/@spling/social-protocol)

| package                                                                        | description                                               |
| ------------------------------------------------------------------------------ | --------------------------------------------------------- |
| [next.js](https://github.com/spling-labs/social-protocol-nextjs-template) | Next.js - Starter Template |
| [react.js](https://github.com/spling-labs/social-protocol-react-template) | React.js - Starter Template |
| [react-native](https://github.com/spling-labs/social-protocol-react-native-template) | React Native - Starter Template |

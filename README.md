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

## Quick Setup

### Install

Install these dependencies over:

npm:

```shell
npm install @spling/social-protocol
```

yarn:

```shell
yarn add @spling/social-protocol
```

### Setup (React Example)

```tsx
import React, { useEffect } from 'react'
import * as anchor from '@project-serum/anchor'
import { SocialProtocol } from '@spling/social-protocol'
import { AnchorWallet, useAnchorWallet, Keypair } from '@solana/wallet-adapter-react'

export default function SocialProtocol() {
  const wallet = useAnchorWallet()
  const payerWallet: Keypair = Keypair.generate()

  useEffect(() => {
    ;(async () => {
      if (wallet?.publicKey) {
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

### Examples

| package                                                                        | description                                               |
| ------------------------------------------------------------------------------ | --------------------------------------------------------- |
| [node](https://github.com/spling-labs/social-protocol/tree/main/examples/node) | Using @spling/protocol in a nodejs environment components |
| [react](https://github.com/spling-labs/social-protocol/tree/main/examples/react) | Using @spling/protocol in a react/browser environment   |
| [react-native](https://github.com/spling-labs/social-protocol/tree/main/examples/react-native) | Using @spling/protocol in a react-native environment |

### Build From Source

Clone the project:

```shell
git clone https://github.com/spling-labs/social-protocol.git
```

Install dependencies:

```shell
cd social-protocol
npm install
```

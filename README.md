<div align="center">
  <img src="https://raw.githubusercontent.com/spling-protocol/social/main/assets/spling_header.jpg" />

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
import { AnchorWallet, useAnchorWallet, useConnection } from '@solana/wallet-adapter-react'

export default function SocialProtocol() {
  const { connection } = useConnection()
  const wallet = useAnchorWallet()
  useEffect(() => {
    ;(async () => {
      if (wallet?.publicKey) {
        const socialProtocol = await new SocialProtocol(connection, wallet).init()
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
import { Wallet } from "react-native-project-serum-anchor";
import { Keypair, Transaction, PublicKey } from "@solana/web3.js";

type anchorWallet = typeof Wallet;

export class AnchorWallet implements anchorWallet {
  constructor(readonly payer: Keypair) {
    this.payer = payer;
  }

  async signTransaction(tx: Transaction): Promise<Transaction> {
    tx.partialSign(this.payer);
    return tx;
  }

  async signAllTransactions(txs: Transaction[]): Promise<Transaction[]> {
    return txs.map((t) => {
      t.partialSign(this.payer);
      return t;
    });
  }

  get publicKey(): PublicKey {
    return this.payer.publicKey;
  }
}

export default function SocialProtocol() {
  useEffect(() => {
    ;(async () => {
      const wallet: Keypair = Keypair.generate()
      const socialProtocol = await new SocialProtocol(connection, new AnchorWallet(wallet)).init()
    })()
  }, [])
  
  return <View></View>;
}
```

### Setup (NodeJS Example)

```js
import { SocialProtocol } from '@spling/social-protocol'
const socialProtocol = await new SocialProtocol(connection, wallet).init()
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

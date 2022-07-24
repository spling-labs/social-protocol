<div align="center">
  <img src="https://pbs.twimg.com/profile_banners/1550448683677880321/1658497849/1500x500" />

  <h1>Social Protocol</h1>
   <p>
    <a href="https://spling.app/protocol"><img alt="Docs" src="https://img.shields.io/badge/docs-typedoc-blueviolet" /></a>
    <a href="https://www.npmjs.com/package/@solana/web3.js"><img alt="Downloads" src="https://img.shields.io/npm/v/@spling/protocol"/></a>
    <a href="https://www.npmjs.com/package/@solana/web3.js"><img alt="Downloads" src="https://img.shields.io/npm/dm/@spling/protocol" /></a>
    <img alt="Downloads" src="https://img.shields.io/npm/l/@spling/protocol" />
	</p>
</div>

Spling social protocol for building a solana on-chain social media platform.

## Quick Setup

### Install

Install these dependencies over:

npm:

```shell
npm install @spling/protocol
```

yarn:

```shell
yarn add @spling/protocol
```

### Setup (React Example)

```tsx
import React, { useEffect } from "react";
import * as anchor from "@project-serum/anchor";
import { SplingProtocol } from "@spling/protocol";
import {
  AnchorWallet,
  useAnchorWallet,
  useConnection,
} from "@solana/wallet-adapter-react";

export default function SplingProtocol() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  useEffect(() => {
    (async () => {
      if (wallet?.publicKey) {
        const splingProtocol = await new SplingProtocol(
          connection,
          wallet
        ).init();
      }
    })();
  }, [wallet?.publicKey]);
  return <div></div>;
}
```

### Setup (NodeJS Example)

```js
import { SplingProtocol } from "@spling/protocol";
const splingProtocol = await new SplingProtocol(connection, wallet).init();
```

### Examples

| package                                                            | description                                               |
| ------------------------------------------------------------------ | --------------------------------------------------------- |
| [node](https://github.com/spling-protocol/tree/main/examples/node) | Using @spling/protocol in a nodejs environment components |
| [react](https://github.com/spling-protocol/tree/main/examples/web) | Using @spling/protocol in a react/browser environment     |

### Build From Source

1. Clone the project:

```shell
git clone https://github.com/spling-protocol/social.git
```

2. Install dependencies:

```shell
cd spling-protocol
npm install
```

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

Spling social protocol for building a solana on-chain social media platform.

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
import React, { useEffect } from "react";
import * as anchor from "@project-serum/anchor";
import { SplingProtocol } from "@spling/social-protocol";
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
import { SplingProtocol } from "@spling/social-protocol";
const splingProtocol = await new SplingProtocol(connection, wallet).init();
```

### Examples

| package                                                            | description                                               |
|--------------------------------------------------------------------| --------------------------------------------------------- |
| [node](https://github.com/spling-labs/social-protocol/tree/main/examples/node)     | Using @spling/protocol in a nodejs environment components |
| [react](https://github.com/spling-labs/social-protocol/tree/main/examples/web) | Using @spling/protocol in a react/browser environment     |

### Build From Source

1. Clone the project:

```shell
git clone https://github.com/spling-labs/social-protocol.git
```

2. Install dependencies:

```shell
cd social
npm install
```

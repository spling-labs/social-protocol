<div align="center">
  <img src="https://pbs.twimg.com/profile_banners/1550448683677880321/1658497849/1500x500" />

  <h1>Protocol</h1>
   <p>
    <a href="https://spling.github.io/spling-protocol/"><img alt="Docs" src="https://img.shields.io/badge/docs-typedoc-blueviolet" /></a>
	</p>
</div>

Spling protocol for building a solana on-chain social media platform.

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
import { SplProtocol } from "@spling/protocol";
import {
  AnchorWallet,
  useAnchorWallet,
  useConnection,
} from "@solana/wallet-adapter-react";

export default function SplProtocol() {
  const { connection } = useConnection();
  const wallet = useAnchorWallet();
  useEffect(() => {
    (async () => {
      if (wallet?.publicKey) {
        const splProtocol = await new SplProtocol(connection, wallet).init();
      }
    })();
  }, [wallet?.publicKey]);
  return <div></div>;
}
```

### Setup (NodeJS Example)

```js
import { SplProtocol } from "@spling/protocol";
const splProtocol = await new SplProtocol(connection, wallet).init();
```

### Examples

| package                                                                   | description                                              |
| ------------------------------------------------------------------------- | -------------------------------------------------------- |
| [node](https://github.com/Spling/spling-protocol/tree/main/examples/node) | Using spling-protocol in a nodejs environment components |
| [react](https://github.com/Spling/spling-protocol/tree/main/examples/web) | Using spling-protocol in a react/browser environment     |

### Build From Source

1. Clone the project:

```shell
git clone https://github.com/spling/spling-protocol.git
```

2. Install dependencies:

```shell
cd spling-protocol
npm install
```

import { web3 } from '@project-serum/anchor'

export class TagsChain {
  publicKey: web3.PublicKey
  tags: string[]

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  constructor(publicKey: web3.PublicKey, accountData: any) {
    this.publicKey = publicKey
    this.tags = accountData.taglist
  }

  get key() {
    return this.publicKey.toBase58()
  }
}

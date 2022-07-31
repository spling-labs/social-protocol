import { web3 } from '@project-serum/anchor'

export class UserChain {
  publicKey: web3.PublicKey
  shdw: web3.PublicKey
  hash: web3.PublicKey

  constructor(publicKey: web3.PublicKey, accountData: any) {
    this.publicKey = publicKey
    this.shdw = accountData.shdw
    this.hash = accountData.hash
  }

  get key() {
    return this.publicKey.toBase58()
  }
}

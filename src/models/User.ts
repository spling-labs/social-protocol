import { web3 } from '@project-serum/anchor'

export class User {
  private publicKey: web3.PublicKey
  username: string

  constructor(publicKey: web3.PublicKey, accountData: any) {
    this.publicKey = publicKey
    this.username = accountData.username
  }

  get key() {
    return this.publicKey.toBase58()
  }
}

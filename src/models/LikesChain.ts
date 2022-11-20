import { web3 } from 'react-native-project-serum-anchor'

export class LikesChain {
  publicKey: web3.PublicKey
  counter: number
  users: number[]

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  constructor(publicKey: web3.PublicKey, accountData: any) {
    this.publicKey = publicKey
    this.counter = accountData.counter
    this.users = accountData.users
  }

  get key() {
    return this.publicKey.toBase58()
  }
}

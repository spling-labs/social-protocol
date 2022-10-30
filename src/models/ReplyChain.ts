import { web3 } from 'react-native-project-serum-anchor'

export class ReplyChain {
  publicKey: web3.PublicKey
  timestamp: number
  userId: number
  postId: number
  status: number

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  constructor(publicKey: web3.PublicKey, accountData: any) {
    this.publicKey = publicKey
    this.timestamp = accountData.ts
    this.userId = accountData.uid
    this.postId = accountData.pid
    this.status = accountData.st
  }

  get key() {
    return this.publicKey.toBase58()
  }
}

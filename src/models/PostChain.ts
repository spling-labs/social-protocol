import { web3 } from '@project-serum/anchor'

export class PostChain {
  publicKey: web3.PublicKey
  timestamp: number
  userId: number
  groupId: number
  status: number

  constructor(publicKey: web3.PublicKey, accountData: any) {
    this.publicKey = publicKey
    this.timestamp = accountData.ts
    this.userId = accountData.uid
    this.groupId = accountData.gid
    this.status = accountData.st
  }

  get key() {
    return this.publicKey.toBase58()
  }
}

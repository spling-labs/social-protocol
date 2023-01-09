import { web3 } from '@project-serum/anchor'

export class UserChain {
  publicKey: web3.PublicKey
  timestamp: number
  user: web3.PublicKey
  userId: number
  status: number
  shdw: web3.PublicKey
  following: number[]
  groups: number[]

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  constructor(accountData: any) {
    this.publicKey = accountData.publicKey
    this.timestamp = accountData.ts
    this.user = accountData.user
    this.userId = accountData.uid
    this.status = accountData.st
    this.shdw = accountData.shdw
    this.following = accountData.following
    this.groups = accountData.groups
  }

  get key() {
    return this.publicKey.toBase58()
  }
}

import { web3 } from '@project-serum/anchor'

export class GroupChain {
  publicKey: web3.PublicKey
  timestamp: number
  groupId: number
  status: number
  shdw: web3.PublicKey

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  constructor(publicKey: web3.PublicKey, accountData: any) {
    this.publicKey = publicKey
    this.timestamp = accountData.ts
    this.groupId = accountData.gid
    this.status = accountData.st
    this.shdw = accountData.shdw
  }

  get key() {
    return this.publicKey.toBase58()
  }
}

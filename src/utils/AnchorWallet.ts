import { Wallet } from '@project-serum/anchor'
import { Keypair, Transaction, PublicKey } from '@solana/web3.js'

export class AnchorWallet implements Wallet {
  constructor(readonly payer: Keypair) {
    this.payer = payer
  }

  async signTransaction(tx: Transaction): Promise<Transaction> {
    tx.partialSign(this.payer)
    return tx
  }

  async signAllTransactions(txs: Transaction[]): Promise<Transaction[]> {
    return txs.map((t) => {
      t.partialSign(this.payer)
      return t
    })
  }

  get publicKey(): PublicKey {
    return this.payer.publicKey
  }
}

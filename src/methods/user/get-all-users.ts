import { web3 } from '@project-serum/anchor'
import { programId } from '../../utils/constants'
import { User } from '../../types'

/**
 * @category User
 */
export default async function getAllUsers(): Promise<User[]> {
  const accounts = await (this.connection as web3.Connection).getParsedProgramAccounts(programId, {
    commitment: 'confirmed',
  })
  accounts.forEach((account) => {
    // Parse the account data
    console.log(account)
  })
  return Promise.resolve([{ username: '', avatar: '', bio: '', index: 0 }])
}

import { SplingChain } from '../../models/SplingChain'
import { Spling } from '../../types'

/**
 * @category Spling
 */
export default async function getAllSplings(): Promise<Spling[]> {
  try {
    const groups = await this.anchorProgram.account.group.all({})
    const splings: Spling[] = groups.map((group: any) => {
      const splingChain = new SplingChain(group.publicKey, group.account)

      // TODO: Get name, bio and image from .json file.

      return {
        publicKey: splingChain.publicKey,
        user: splingChain.user,
        shdw: splingChain.shdw,
        hash: splingChain.hash,
        name: '',
        bio: '',
        image: '',
      } as Spling
    })
    return Promise.resolve(splings)
  } catch (error) {
    return Promise.reject(error)
  }
}

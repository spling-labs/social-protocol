import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId, shadowDriveDomain } from '../../utils/constants'
import { User, UserFileData } from '../../types'
import { InvalidHashError } from '../../utils/errors'
import { getPublicKeyFromSeed } from '../../utils/helpers'
import { UserChain } from '../../models'
import { getUserFileData } from './helpers'

/**
 * @category User
 * @param publicKey - The PublicKey of the user.
 */
export default async function getUser(publicKey: web3.PublicKey): Promise<User> {
  try {
    const [profilePDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('profile'), publicKey.toBuffer()],
      programId,
    )
    const profile = await this.anchorProgram.account.profile.fetch(profilePDA)
    const userChain = new UserChain(publicKey, profile)

    // Get user profile json file from the shadow drive.
    const userProfileJson: UserFileData = await getUserFileData(userChain.shdw)

    // Build user avatar url from shadow drive.
    if (userProfileJson.avatar.toString().length > 0) {
      userProfileJson.avatar = `${shadowDriveDomain}${userChain.shdw.toString()}/${
        userProfileJson.avatar
      }`
    }

    // Check if hashes are valid.
    const hash: web3.PublicKey = getPublicKeyFromSeed(userProfileJson.username.toString())
    if (hash.toString() != userChain.hash.toString()) throw new InvalidHashError()

    return Promise.resolve({
      publicKey: publicKey,
      shdw: userChain.shdw,
      hash: userChain.hash,
      ...userProfileJson,
    } as User)
  } catch (error) {
    return Promise.reject(error)
  }
}

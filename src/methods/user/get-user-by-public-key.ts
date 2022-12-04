import { programId, shadowDriveDomain } from '../../utils/constants'
import { User, UserFileData } from '../../types'
import { UserChain } from '../../models'
import { getUserFileData } from './helpers'
import { web3 } from 'react-native-project-serum-anchor'
import * as anchor from 'react-native-project-serum-anchor'

/**
 * @category User
 * @param publicKey - The public key of the user.
 */
export default async function getUserByPublicKey(publicKey: web3.PublicKey): Promise<User | null> {
  try {
    // Find the user profile pda.
    const [UserProfilePDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('user_profile'), publicKey.toBuffer()],
      programId,
    )

    // Fetch the user profile from the anchor program.
    const onChainProfile = await this.anchorProgram.account.userProfile.fetch(UserProfilePDA)
    const userChain = new UserChain(onChainProfile)

    // Get user profile json file from the shadow drive.
    const userProfileJson: UserFileData = await getUserFileData(userChain.shdw)

    return Promise.resolve({
      timestamp: userChain.timestamp,
      publicKey: userChain.publicKey,
      userId: userChain.userId,
      status: userChain.status,
      shdw: userChain.shdw,
      following: userChain.following,
      groups: userChain.groups,
      nickname: userProfileJson.nickname,
      bio: userProfileJson.bio,
      avatar:
        userProfileJson.avatar != null
          ? `${shadowDriveDomain}${userChain.shdw.toString()}/${userProfileJson.avatar.file}`
          : null,
      banner: null,
      socials: userProfileJson.socials,
      license: userProfileJson.license,
    } as User)
  } catch (error) {
    if (error.message.includes('Account does not exist')) return Promise.resolve(null)
    else return Promise.reject(error)
  }
}

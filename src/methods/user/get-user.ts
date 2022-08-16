import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId, shadowDriveDomain } from '../../utils/constants'
import { User, UserFileData } from '../../types'
import { UserChain } from '../../models'
import { getUserFileData } from './helpers'

/**
 * @category User
 * @param userId - The id of the user.
 */
export default async function getUser(userId: string): Promise<User> {
  try {
    // Find the user profile pda.
    const [UserProfilePDA] = await web3.PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('user_profile'),
        anchor.utils.bytes.utf8.encode(userId.toString()),
      ],
      programId,
    )

    // Fetch the user profile.
    const profile = await this.anchorProgram.account.userProfile.fetch(UserProfilePDA)
    const userChain = new UserChain(UserProfilePDA, profile)

    // Get user profile json file from the shadow drive.
    const userProfileJson: UserFileData = await getUserFileData(userChain.shdw)

    return Promise.resolve({
      timestamp: userChain.timestamp,
      publicKey: userChain.user,
      userId: Number(userId),
      status: userChain.status,
      shdw: userChain.shdw,
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
    return Promise.reject(error)
  }
}

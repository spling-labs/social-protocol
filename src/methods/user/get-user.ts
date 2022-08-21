import { shadowDriveDomain } from '../../utils/constants'
import { User, UserFileData } from '../../types'
import { UserChain } from '../../models'
import { getUserFileData } from './helpers'
import { UserNotFoundError } from '../../utils/errors'
import { convertNumberToBase58 } from '../../utils/helpers'

/**
 * @category User
 * @param userId - The id of the user.
 */
export default async function getUser(userId: string): Promise<User> {
  try {
    // Fetch the user profile.
    const onChainProfiles = await this.anchorProgram.account.userProfile.all([
      {
        memcmp: {
          offset:
            8 + // Discriminator
            8 + // Timestamp
            32, // user
          bytes: convertNumberToBase58(Number(userId)),
        },
      },
    ])
    if (onChainProfiles.length === 0) throw new UserNotFoundError()

    const profile = onChainProfiles[0]
    const userChain = new UserChain(profile.publicKey, profile.account)

    // Get user profile json file from the shadow drive.
    const userProfileJson: UserFileData = await getUserFileData(userChain.shdw)

    return Promise.resolve({
      timestamp: userChain.timestamp,
      publicKey: userChain.user,
      userId: Number(userId),
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
    return Promise.reject(error)
  }
}

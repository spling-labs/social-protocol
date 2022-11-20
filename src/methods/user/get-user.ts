import { shadowDriveDomain } from '../../utils/constants'
import { User, UserFileData } from '../../types'
import { UserChain } from '../../models'
import { getUserFileData } from './helpers'
import { UserNotFoundError } from '../../utils/errors'
import { bs58 } from 'react-native-project-serum-anchor/dist/cjs/utils/bytes'

/**
 * @category User
 * @param userId - The id of the user.
 */
export default async function getUser(userId: number): Promise<User | null> {
  try {
    // Fetch the user profile.
    const onChainProfiles = await this.anchorProgram.account.userProfile.all([
      {
        memcmp: {
          offset:
            8 + // Discriminator
            8 + // Timestamp
            32, // user
          bytes: bs58.encode(Uint8Array.from([userId])),
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
      userId: userId,
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
    if (error.message.includes('Account does not exist') || error instanceof UserNotFoundError)
      return Promise.resolve(null)
    return Promise.reject(error)
  }
}

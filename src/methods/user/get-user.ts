import { shadowDriveDomain } from '../../utils/constants'
import { User, UserFileData } from '../../types'
import { UserChain } from '../../models'
import { getUserFileData } from './helpers'
import { UserNotFoundError } from '../../utils/errors'
import { bs58 } from 'react-native-project-serum-anchor/dist/cjs/utils/bytes'
import { GetUserByUserIdQuery, Splinglabs_0_1_0_Decoded_Userprofile } from '../../gql/graphql'
import { GetUserByUserIdQueryDocument } from '../../utils/gql/user'
import { web3 } from 'react-native-project-serum-anchor'

/**
 * Retrieve a user by their id.
 * 
 * @category User
 * 
 * @param userId -  The id of the user to retrieve.
 * 
 * @returns {Promise<User | null>} A promise that resolves to a User object or null if the user does not exist.
 */
export default async function getUser(userId: number): Promise<User | null> {
  try {
    if (this.graphQLClient !== null) {
      const userQuery: GetUserByUserIdQuery = await this.graphQLClient.request(GetUserByUserIdQueryDocument, { userId: userId })
      if (userQuery.splinglabs_0_1_0_decoded_userprofile.length <= 0) throw new UserNotFoundError()

      const userChain: Splinglabs_0_1_0_Decoded_Userprofile = userQuery.splinglabs_0_1_0_decoded_userprofile[0]
      const userPublicKey: web3.PublicKey = new web3.PublicKey(userChain.username)
      const userShdwPublicKey: web3.PublicKey = new web3.PublicKey(userChain.shdw)

      // Get user profile json file from the shadow drive.
      const userProfileJson: UserFileData = await getUserFileData(userShdwPublicKey)

      return Promise.resolve({
        timestamp: userChain.ts,
        publicKey: userPublicKey,
        userId: userChain.uid,
        status: userChain.st,
        shdw: userShdwPublicKey,
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
    } else {
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
      const userChain = new UserChain(profile.account)

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
    }
  } catch (error) {
    if (error.message.includes('Account does not exist') || error instanceof UserNotFoundError) {
      return Promise.resolve(null)
    }
    return Promise.reject(error)
  }
}

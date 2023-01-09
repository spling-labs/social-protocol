import { programId, shadowDriveDomain } from '../../utils/constants'
import { User, UserFileData } from '../../types'
import { UserChain } from '../../models'
import { getUserFileData } from './helpers'
import { web3 } from '@project-serum/anchor'
import * as anchor from '@project-serum/anchor'
import { GetUserByPublicKeyQuery, Splinglabs_0_1_0_Decoded_Userprofile } from '../../gql/graphql'
import { GetUserByPublicKeyQueryDocument } from '../../utils/gql/user'
import { UserNotFoundError } from '../../utils/errors'

/**
 * Retrieve a user by their public key.
 * 
 * @category User
 * 
 * @param {web3.PublicKey} publicKey - The public key of the user to retrieve.
 * 
 * @returns {Promise<User | null>} A promise that resolves to a User object or null if the user does not exist.
 */
export default async function getUserByPublicKey(publicKey: web3.PublicKey): Promise<User | null> {
  try {
    // Find the user profile pda.
    const [UserProfilePDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('user_profile'), publicKey.toBuffer()],
      programId,
    )

    if (this.graphQLClient !== null) {
      const userQuery: GetUserByPublicKeyQuery = await this.graphQLClient.request(GetUserByPublicKeyQueryDocument, { publicKey: UserProfilePDA.toString() })
      const userChain: Splinglabs_0_1_0_Decoded_Userprofile | null = userQuery.splinglabs_0_1_0_decoded_userprofile_by_pk
      if (userChain === null) throw new UserNotFoundError()

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
    }
  } catch (error) {
    if (error.message.includes('Account does not exist') || error instanceof UserNotFoundError) return Promise.resolve(null)
    else return Promise.reject(error)
  }
}

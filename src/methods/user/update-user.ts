import { convertDataUriToBlob } from '../../utils/helpers'
import { FileData, FileUriData, MediaData, User, UserFileData } from '../../types'
import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { isBrowser, programId, shadowDriveDomain } from '../../utils/constants'
import { ShadowFile } from 'react-native-shadow-drive'
import { UserChain } from '../../models'
import { getUserFileData } from './helpers'

/**
 * Creates a user with the given parameters.
 * 
 * @category User
 * 
 * @param {string | null} nickname - The nickname of the user to be updated.
 * @param {FileData | FileUriData | null} avatar - The avatar of the user to be updated. Can be a FileData object, a FileUriData object, or null.
 * @param {string | null} biography - The biography for the user to be updated. Can be a string or null.
 * @param {any | null} metadata - An updated json object containing any relevant metadata to be associated with the user.
 * 
 * @returns {Promise<User>} A promise that resolves to the newly created user.
 */
export default async function updateUser(
  nickname: string | null = null,
  avatar: FileData | FileUriData | null = null,
  biography: string | null = null,
  metadata: any | null = null,
): Promise<User> {
  try {
    // Check if metadata object is a valid json.
    const metadataObject: any | null = metadata ? JSON.parse(JSON.stringify(metadata)) : null
    if (typeof metadataObject !== 'object') throw new Error('Invalid JSON object')

    // Find the user profile pda.
    const [UserProfilePDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('user_profile'), this.wallet.publicKey.toBuffer()],
      programId,
    )

    // Fetch the user profile from the anchor program.
    const onChainProfile = await this.anchorProgram.account.userProfile.fetch(UserProfilePDA)
    const userChain = new UserChain(onChainProfile)

    // Get user profile json file from the shadow drive.
    const userProfileJson: UserFileData = await getUserFileData(userChain.shdw)

    // Generate avatar file to upload.
    let userAvatarFile = null

    if (avatar !== null) {
      if (!isBrowser) {
        const RNFS = require('react-native-fs')
        const readedFile = await RNFS.readFile((avatar as FileUriData).uri, 'base64')

        userAvatarFile = {
          uri: (avatar as FileUriData).uri,
          name: `profile-avatar.${avatar.type.split('/')[1]}`,
          type: (avatar as FileUriData).type,
          size: (avatar as FileUriData).size,
          file: Buffer.from(readedFile, 'base64'),
        } as ShadowFile
      } else {
        userAvatarFile = new File(
          [convertDataUriToBlob((avatar as FileData).base64)],
          `profile-avatar.${avatar.type.split('/')[1]}`,
        )
      }
    }

    if (userAvatarFile != null) {
      // Edit avatar image from shadow drive.
      if (userProfileJson.avatar !== null && userProfileJson.avatar.type === avatar.type.split('/')[1]) {
        await this.shadowDrive.editFile(
          userChain.shdw,
          `${shadowDriveDomain}${userChain.shdw.toString()}/${userProfileJson.avatar.file}`,
          !isBrowser ? (userAvatarFile as ShadowFile) : (userAvatarFile as File),
          'v2'
        )
      } else {
        // Upload avatar image file to shadow drive.
        await this.shadowDrive.uploadFile(
          userChain.shdw,
          !isBrowser ? (userAvatarFile as ShadowFile) : (userAvatarFile as File),
        )
      }
    }

    // Update effected user profile fields.
    if (nickname !== null) {
      userProfileJson.nickname = nickname
    }

    if (biography !== null) {
      userProfileJson.bio = biography
    }

    if (avatar !== null) {
      userProfileJson.avatar = userAvatarFile
        ? ({
          file: `profile-avatar.${avatar.type.split('/')[1]}`,
          type: avatar.type.split('/')[1],
        } as MediaData)
        : null
    }

    if (metadata !== null) {
      userProfileJson.metadata = metadataObject
    }

    let profileFile
    if (!isBrowser) {
      const RNFS = require('react-native-fs')
      const profileJSONPath = `${RNFS.DocumentDirectoryPath}/profile.json`
      await RNFS.writeFile(profileJSONPath, JSON.stringify(userProfileJson), 'utf8')
      const statResult = await RNFS.stat(profileJSONPath)
      const file = await RNFS.readFile(profileJSONPath, 'utf8')

      profileFile = {
        uri: `file://${profileJSONPath}`,
        type: 'application/json',
        file: Buffer.from(file, 'utf8'),
        name: 'profile.json',
        size: statResult.size,
      } as ShadowFile
    } else {
      const fileToSave = new Blob([JSON.stringify(userProfileJson)], { type: 'application/json' })
      profileFile = new File([fileToSave], 'profile.json')
    }

    // Edit current profile.json from 
    await this.shadowDrive.editFile(
      userChain.shdw,
      `${shadowDriveDomain}${userChain.shdw.toString()}/profile.json`,
      !isBrowser ? (profileFile as ShadowFile) : (profileFile as File),
      'v2'
    )

    if (profileFile !== null && !isBrowser) {
      const RNFS = require('react-native-fs')
      RNFS.unlink(`${RNFS.DocumentDirectoryPath}/profile.json`)
    }

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
      avatar: userProfileJson.avatar != null
        ? `${shadowDriveDomain}${userChain.shdw.toString()}/${userProfileJson.avatar.file}`
        : null,
      banner: null,
      socials: userProfileJson.socials,
      license: userProfileJson.license,
      metadata: userProfileJson.metadata
    } as User)
  } catch (error) {
    return Promise.reject(error)
  }
}

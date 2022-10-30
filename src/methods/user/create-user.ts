import { convertDataUriToBlob, getOrCreateShadowDriveAccount } from '../../utils/helpers'
import { FileData, FileUriData, MediaData, User, UserFileData } from '../../types'
import * as anchor from 'react-native-project-serum-anchor'
import { web3 } from 'react-native-project-serum-anchor'
import { isBrowser, programId, shadowDriveDomain } from '../../utils/constants'
import { ShadowFile, StorageAccountResponse } from 'react-native-shadow-drive'
import { UserChain } from '../../models'
import dayjs from 'dayjs'
import RNFS from 'react-native-fs'

/**
 * @category User
 * @param nickname - The nickname of the user.
 * @param avatar - The image FileData of the user avatar.
 * @param biography - The biography of the user.
 */
export default async function createUser(
  nickname: string,
  avatar: FileData | FileUriData | null,
  biography: string | null,
): Promise<User> {
  try {
    // Generate avatar file to upload.
    let userAvatarFile = null

    if (!isBrowser) {
      userAvatarFile = avatar
        ? ({
            uri: (avatar as FileUriData).uri,
            name: `profile-avatar.${avatar.type.split('/')[1]}`,
            type: (avatar as FileUriData).type,
            size: (avatar as FileUriData).size,
            file: Buffer.from(''),
          } as ShadowFile)
        : null
    } else {
      userAvatarFile = avatar
        ? new File(
            [convertDataUriToBlob((avatar as FileData).base64)],
            `profile-avatar.${avatar.type.split('/')[1]}`,
          )
        : null
    }

    let fileSizeSummarized = 1024 // 1024 bytes will be reserved for the userProfile.json.

    // Summarize size of files.
    if (userAvatarFile != null) {
      fileSizeSummarized += avatar.size
    }

    // Find/Create shadow drive account.
    const account: StorageAccountResponse = await getOrCreateShadowDriveAccount(
      this.shadowDrive,
      fileSizeSummarized,
    )

    // const filesToUpload: File[] = []

    // Upload image file to shadow drive.
    if (userAvatarFile != null) {
      // filesToUpload.push(userAvatarFile)
      await this.shadowDrive.uploadFile(
        account.publicKey,
        !isBrowser ? (userAvatarFile as ShadowFile) : (userAvatarFile as File),
      )
    }

    // Generate the user profile json.
    const userProfileJson: UserFileData = {
      timestamp: dayjs().unix().toString(),
      nickname: nickname,
      bio: biography ? biography : '',
      avatar: userAvatarFile
        ? ({
            file: `profile-avatar.${avatar.type.split('/')[1]}`,
            type: avatar.type.split('/')[1],
          } as MediaData)
        : null,
      banner: null,
      socials: [],
      license: null,
    }

    if (!isBrowser) {
      const profileJSONPath = `${RNFS.DownloadDirectoryPath}/profile.json`
      await RNFS.writeFile(profileJSONPath, JSON.stringify(userProfileJson), 'utf8')
      const statResult = await RNFS.stat(profileJSONPath)
      const file = await RNFS.readFile(profileJSONPath, 'utf8')

      const profileFile: ShadowFile = {
        uri: `file://${profileJSONPath}`,
        type: 'application/json',
        file: Buffer.from(file, 'utf8'),
        name: 'profile.json',
        size: statResult.size,
      }

      await this.shadowDrive.uploadFile(account.publicKey, profileFile)
      await RNFS.unlink(profileJSONPath)
    } else {
      const fileToSave = new Blob([JSON.stringify(userProfileJson)], { type: 'application/json' })
      const userProfileFile = new File([fileToSave], 'profile.json')
      await this.shadowDrive.uploadFile(account.publicKey, userProfileFile)
    }

    /*
    const fileToSave = new Blob([JSON.stringify(userProfileJson)], { type: 'application/json' })
    const userProfileFile = new File([fileToSave], 'profile.json')
    filesToUpload.push(userProfileFile)

    // Upload all files to shadow drive.
    // TODO: Make the function react native ready to use it.
    await this.shadowDrive.uploadMultipleFiles(account.publicKey, filesToUpload, 'v2')
    */

    // Find spling pda.
    const [SplingPDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('spling')],
      programId,
    )

    // Find the user profile pda.
    const [UserProfilePDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('user_profile'), this.wallet.publicKey.toBuffer()],
      programId,
    )

    // Submit the user profile to the anchor program.
    await this.anchorProgram.methods
      .createUserProfile(account.publicKey)
      .accounts({
        user: this.wallet.publicKey,
        spling: SplingPDA,
        userProfile: UserProfilePDA,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc()

    // Fetch the user profile from the anchor program.
    const userProfile = await this.anchorProgram.account.userProfile.fetch(UserProfilePDA)
    const userChain = new UserChain(userProfile.publicKey, userProfile)

    return Promise.resolve({
      timestamp: userChain.timestamp,
      publicKey: this.wallet.publicKey,
      userId: userChain.userId,
      status: userChain.status,
      shdw: account.publicKey,
      following: [],
      groups: [],
      nickname: nickname,
      bio: biography ? biography : '',
      avatar: userAvatarFile
        ? `${shadowDriveDomain}${account.publicKey}/${userProfileJson.avatar.file}`
        : null,
      banner: null,
      socials: userProfileJson.socials,
      license: userProfileJson.license,
    } as User)
  } catch (error) {
    return Promise.reject(error)
  }
}

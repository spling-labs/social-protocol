import {
  convertDataUriToBlob,
  getPublicKeyFromSeed,
  getOrCreateShadowDriveAccount,
} from '../../utils/helpers'
import { FileData, User, UserFileData } from '../../types'
import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId, shadowDriveDomain } from '../../utils/constants'
import { StorageAccountResponse } from '@shadow-drive/sdk'

/**
 * @category User
 * @param username - The username of the user.
 * @param avatar - The image FileData of the user avatar.
 * @param biography - The biography of the user.
 */
export default async function createUser(
  username: string,
  avatar: FileData | null,
  biography: string | null,
): Promise<User> {
  try {
    // Generate files to upload (avatar + biography).
    const userAvatarFile = avatar
      ? new File(
          [convertDataUriToBlob(avatar.base64)],
          'profile-avatar.' + avatar?.type.split('/')[1],
        )
      : null

    let fileSizeSummarized = 1024 // 1024 bytes will be reserved for the userProfile.json.

    // Summarize size of files.
    if (userAvatarFile != null) {
      fileSizeSummarized += userAvatarFile.size
    }

    // Find/Create shadow drive account.
    const account: StorageAccountResponse = await getOrCreateShadowDriveAccount(
      this.shadowDrive,
      false,
      fileSizeSummarized,
    )

    const filesToUpload: File[] = []

    // Upload image file to shadow drive.
    if (userAvatarFile != null) {
      filesToUpload.push(userAvatarFile)
    }

    // Generate the user profile json.
    const userProfileJson: UserFileData = {
      username: username,
      bio: biography ? biography : '',
      avatar: userAvatarFile ? `profile-avatar.${avatar.type.split('/')[1]}` : '',
    }

    const fileToSave = new Blob([JSON.stringify(userProfileJson)], {
      type: 'application/json',
    })
    const userProfileFile = new File([fileToSave], 'profile.json')
    filesToUpload.push(userProfileFile)

    // Upload all files to shadow drive.
    await this.shadowDrive.uploadMultipleFiles(account.publicKey, filesToUpload, 'v2')

    // Generate the hash from the username.
    const hash: web3.PublicKey = getPublicKeyFromSeed(username.toString())

    // Submit the user profile to the anchor program.
    const [profilePDA, _] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('profile'), this.wallet.publicKey.toBuffer()],
      programId,
    )
    await this.anchorProgram.methods
      .submitProfile(account.publicKey, hash)
      .accounts({
        user: this.wallet.publicKey,
        profile: profilePDA,
      })
      .rpc()

    return Promise.resolve({
      publicKey: this.wallet.publicKey,
      shdw: account.publicKey,
      hash: hash,
      username: username,
      bio: biography ? biography : '',
      avatar: userAvatarFile
        ? `${shadowDriveDomain}${account.publicKey}/${userProfileJson.avatar}`
        : '',
    } as User)
  } catch (error) {
    return Promise.reject(error)
  }
}

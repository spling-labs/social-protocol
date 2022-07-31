import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId } from '../../utils/constants'
import {
  convertDataUriToBlob,
  getPublicKeyFromSeed,
  getShadowDriveAccount,
} from '../../utils/helpers'
import { FileData, User, UserFileData } from '../../types'

/**
 * @category User
 * @param username - The updated username of the user.
 * @param avatar - The updated image FileData of the user avatar.
 * @param biography - The updated biography of the user.
 */
export default async function updateUser(
  username: string,
  avatar: FileData | null,
  biography: string | null,
): Promise<User> {
  try {
    // Generate files to upload (avatar + biography).
    const userAvatarFile = avatar
      ? new File(
          [convertDataUriToBlob(avatar.base64)],
          `profile-avatar.${avatar?.type.split('/')[1]}`,
        )
      : null

    let fileSizeSummarized = 1024 // 1024 bytes will be reserved for the userProfile.json.

    // Summarize size of avatar file.
    if (userAvatarFile != null) {
      fileSizeSummarized += userAvatarFile.size
    }

    // Find/Create shadow drive account.
    const account = await getShadowDriveAccount(this.shadowDrive, false, fileSizeSummarized)

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

    // TODO: Remove all previously uploaded files / or edit current files.

    // Upload all files to shadow drive.
    await this.shadowDrive.uploadMultipleFiles(account.publicKey, filesToUpload, 'v2')

    // Generate the hash from the username.
    const hash: web3.PublicKey = getPublicKeyFromSeed(username.toString())

    // Submit the user profile to the anchor program.
    const [ItemPDA, _] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('profile'), this.wallet.publicKey.toBuffer()],
      programId,
    )
    await this.anchorProgram.methods
      .updateProfile(hash)
      .accounts({
        user: this.wallet.publicKey,
        item: ItemPDA,
      })
      .rpc()

    return Promise.resolve({
      publicKey: this.wallet.publicKey,
      shdw: account.publicKey,
      hash: hash,
      ...userProfileJson,
    } as User)
  } catch (error) {
    return Promise.reject(error)
  }
}

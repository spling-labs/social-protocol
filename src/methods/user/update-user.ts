import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId } from '../../utils/constants'
import {
  convertDataUriToBlob,
  getPublicKeyFromSeed,
  getShadowDriveAccount,
} from '../../utils/helpers'
import { FileData, User } from '../../types'

/**
 * @category User
 * @param username - The updated username of the user.
 * @param avatar - The updated image FileData of the user avatar.
 * @param biography - The updated biography of the user.
 * @param index - The new profile index.
 */
export default async function updateUser(
  username: string,
  avatar: FileData | null,
  biography: string | null,
  index: number,
): Promise<User> {
  try {
    // Generate files to upload (avatar + biography).
    const userAvatarFile = avatar
      ? new File([convertDataUriToBlob(avatar.base64)], `a${index}.${avatar?.type.split('/')[1]}`)
      : null
    const userBioFile = biography
      ? new File([new Blob([biography], { type: 'text/plain' })], `b${index}.txt`)
      : null
    let fileSizeSummarized = 1000 // 1000 bytes will be reserved for the userProfile.json.

    // Summarize size of files.
    if (userAvatarFile != null) {
      fileSizeSummarized += userAvatarFile.size
    }
    if (userBioFile != null) {
      fileSizeSummarized += userBioFile.size
    }

    // Find/Create shadow drive account.
    const account = await getShadowDriveAccount(this.shadowDrive, false, fileSizeSummarized)

    const filesToUpload: File[] = []

    // Upload image file to shadow drive.
    if (userAvatarFile != null) {
      filesToUpload.push(userAvatarFile)
    }

    // Upload biography text file to shadow drive.
    if (userBioFile != null) {
      filesToUpload.push(userBioFile)
    }

    // Generate the user profile json.
    const userProfileJson: User = {
      username: username,
      bio: userBioFile ? `b${index}.txt` : '',
      avatar: userAvatarFile ? `a${index}.${avatar.type.split('/')[1]}` : '',
      index: index,
    }

    const fileToSave = new Blob([JSON.stringify(userProfileJson)], {
      type: 'application/json',
    })
    const userProfileFile = new File([fileToSave], `${index}.json`)
    filesToUpload.push(userProfileFile)

    // Upload all files to shadow drive.
    await this.shadowDrive.uploadMultipleFiles(account.publicKey, filesToUpload, 'v2')

    // Generate the hash from the username.
    const hash: web3.PublicKey = getPublicKeyFromSeed(username.toString())

    // Submit the user profile to the anchor program.
    const [ItemPDA, _] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('item'), this.wallet.publicKey.toBuffer()],
      programId,
    )
    await this.anchorProgram.methods
      .updateItem(hash)
      .accounts({
        user: this.wallet.publicKey,
        item: ItemPDA,
      })
      .rpc()

    return Promise.resolve(userProfileJson)
  } catch (error) {
    return Promise.reject(error)
  }
}

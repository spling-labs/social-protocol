import {
  getShadowDriveAccount,
  convertDataUriToBlob,
  getPublicKeyFromSeed,
} from '../../utils/helpers'
import { FileData, User } from '../../types'
import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId, shadowDriveDomain } from '../../utils/constants'

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
      ? new File([convertDataUriToBlob(avatar.base64)], 'a0.' + avatar?.type.split('/')[1])
      : null
    const userBioFile = biography
      ? new File([new Blob([biography], { type: 'text/plain' })], 'b0.txt')
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
    const account = await getShadowDriveAccount(false, fileSizeSummarized)

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
      bio: userBioFile ? 'b0.txt' : '',
      avatar: userAvatarFile ? `a0.${avatar.type.split('/')[1]}` : '',
      index: 0,
    }

    const fileToSave = new Blob([JSON.stringify(userProfileJson)], {
      type: 'application/json',
    })
    const userProfileFile = new File([fileToSave], '0.json')
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
      .submitItem(account.publicKey, hash, 1)
      .accounts({
        user: this.wallet.publicKey,
        item: ItemPDA,
      })
      .rpc()

    return Promise.resolve({
      username: username,
      bio: biography ? biography : '',
      avatar: userAvatarFile
        ? `${shadowDriveDomain}${account.publicKey}/${userProfileJson.avatar}`
        : '',
      index: 0,
    } as User)
  } catch (error) {
    return Promise.reject(error)
  }
}

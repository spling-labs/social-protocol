import {
  convertDataUriToBlob,
  getOrCreateShadowDriveAccount,
  getPublicKeyFromSeed,
} from '../../utils/helpers'
import { FileData, Spling, SplingFileData } from '../../types'
import { web3 } from '@project-serum/anchor'
import { shadowDriveDomain } from '../../utils/constants'
import { StorageAccountResponse } from '@shadow-drive/sdk'

/**
 * @category Spling
 */
export default async function createSpling(
  name: string,
  bio: string | null,
  image: FileData | null,
): Promise<Spling> {
  try {
    // Generate a group Keypair.
    const group: web3.Keypair = web3.Keypair.generate()

    // Generate image file to upload.
    const imageUploadFile = image
      ? new File(
          [convertDataUriToBlob(image.base64)],
          `${group.publicKey.toString()}.${image?.type.split('/')[1]}`,
        )
      : null

    let fileSizeSummarized = 1024 // 1024 bytes will be reserved for the post.json.

    // Summarize size of files.
    if (imageUploadFile != null) {
      fileSizeSummarized += imageUploadFile.size
    }

    // Find/Create shadow drive account.
    const account: StorageAccountResponse = await getOrCreateShadowDriveAccount(
      this.shadowDrive,
      false,
      fileSizeSummarized,
    )

    const filesToUpload: File[] = []

    // Upload image file to shadow drive.
    if (imageUploadFile != null) {
      filesToUpload.push(imageUploadFile)
    }

    // Generate the spling json.
    const splingJson: SplingFileData = {
      name: name,
      bio: bio ? bio : '',
      image: imageUploadFile ? `${group.publicKey.toString()}.${image.type.split('/')[1]}` : '',
    }
    const fileToSave = new Blob([JSON.stringify(splingJson)], {
      type: 'application/json',
    })
    const splingUploadFile = new File([fileToSave], `${group.publicKey.toString()}.json`)
    filesToUpload.push(splingUploadFile)

    // Upload all files to shadow drive.
    await this.shadowDrive.uploadMultipleFiles(account.publicKey, filesToUpload, 'v2')

    // Generate the hash from the name.
    const hash: web3.PublicKey = getPublicKeyFromSeed(name)

    // Submit the spling to the anchor program.
    await this.anchorProgram.methods
      .submitGroup(account.publicKey, hash, 1)
      .accounts({
        group: group.publicKey,
        user: this.wallet.publicKey,
      })
      .signers([group])
      .rpc()

    return Promise.resolve({
      publicKey: group.publicKey,
      user: this.wallet.publicKey,
      shdw: account.publicKey,
      hash: hash,
      name: name,
      bio: bio,
      image: imageUploadFile ? `${shadowDriveDomain}${account.publicKey}/${splingJson.image}` : '',
    } as Spling)
  } catch (error) {
    return Promise.reject(error)
  }
}

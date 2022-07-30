import {
  convertDataUriToBlob,
  getPublicKeyFromSeed,
  getShadowDriveAccount,
} from '../../utils/helpers'
import { FileData, Spling } from '../../types'
import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId, shadowDriveDomain } from '../../utils/constants'

/**
 * @category Spling
 */
export default async function createSpling(
  index: number,
  name: string,
  bio: string | null,
  image: FileData | null,
): Promise<Spling> {
  try {
    // Generate files to upload (avatar + biography).
    const imageUploadFile = image
      ? new File([convertDataUriToBlob(image.base64)], 'a0.' + image?.type.split('/')[1])
      : null

    // Find/Create shadow drive account.
    const account = await getShadowDriveAccount(this.shadowDrive, false, 0)

    const filesToUpload: File[] = []

    // Upload image file to shadow drive.
    if (imageUploadFile != null) {
      filesToUpload.push(imageUploadFile)
    }

    // Generate the user profile json.
    const splingJson: Spling = {
      name: name,
      bio: bio ? bio : '',
      image: imageUploadFile ? `a0.${image.type.split('/')[1]}` : '',
    }
    const fileToSave = new Blob([JSON.stringify(splingJson)], {
      type: 'application/json',
    })
    const splingUploadFile = new File([fileToSave], '0.json')
    filesToUpload.push(splingUploadFile)

    // Upload all files to shadow drive.
    await this.shadowDrive.uploadMultipleFiles(account.publicKey, filesToUpload, 'v2')

    // Generate the hash from the username.
    const hash: web3.PublicKey = getPublicKeyFromSeed(name)
    const group: web3.Keypair = web3.Keypair.generate()

    console.log('Wallet publicKey: ' + this.wallet.publicKey.toString())
    console.log('Group publicKey: ' + group.publicKey.toString())
    console.log('hash publicKey: ' + hash.toString())

    // Submit the user spling to the anchor program.
    await this.anchorProgram.methods
      .submitGroup(account.publicKey, hash, 1)
      .accounts({
        group: group.publicKey,
        user: this.wallet.publicKey,
        systemProgram: web3.SystemProgram.programId,
      })
      .signers([group])
      .rpc()

    return Promise.resolve({
      name: name,
      bio: bio,
      image: imageUploadFile ? `${shadowDriveDomain}${account.publicKey}/${splingJson.image}` : '',
    } as Spling)
  } catch (error) {
    return Promise.reject(error)
  }
}

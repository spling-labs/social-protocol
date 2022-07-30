import {
  convertDataUriToBlob,
  getPublicKeyFromSeed,
  getShadowDriveAccount,
} from '../../utils/helpers'
import { FileData, Post } from '../../types'
import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId, shadowDriveDomain } from '../../utils/constants'

/**
 * @category Post
 * @param text - The text of the post.
 * @param image - The image of the post.
 * @param index - The next index of the post.
 */
export default async function createPost(
  text: string,
  image: FileData,
  index: number,
): Promise<Post> {
  try {
    // Generate image file to upload.
    const postImageFile = new File(
      [convertDataUriToBlob(image.base64)],
      `${index}.${image?.type.split('/')[1]}`,
    )

    const postTextFile = new File([new Blob([text], { type: 'text/plain' })], `${index}.txt`)

    const fileSizeSummarized = 1000 + postImageFile.size + postTextFile.size // 1000 bytes will be reserved for the post.json.

    // Find/Create shadow drive account.
    const account = await getShadowDriveAccount(this.shadowDrive, false, fileSizeSummarized)

    // Generate the post json.
    const postJson: Post = {
      text: `${index}.txt`,
      image: `${index}.${image.type.split('/')[1]}`,
    }

    const fileToSave = new Blob([JSON.stringify(postJson)], {
      type: 'application/json',
    })
    const postFile = new File([fileToSave], `${index}.json`)

    // Upload all files to shadow drive.
    await this.shadowDrive.uploadMultipleFiles(
      account.publicKey,
      [postImageFile, postTextFile, postFile],
      'v2',
    )

    // Generate the hash from the text.
    const hash: web3.PublicKey = getPublicKeyFromSeed(text.toString())

    // Submit the post to the anchor program.
    const [ItemPDA, _] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('item'), this.wallet.publicKey.toBuffer()],
      programId,
    )

    await this.anchorProgram.methods
      .submitItem(account.publicKey, hash, 2)
      .accounts({
        user: this.wallet.publicKey,
        item: ItemPDA,
      })
      .rpc()

    return Promise.resolve({
      text: text,
      image: `${shadowDriveDomain}${account.publicKey.toString()}/${postJson.image}`,
    } as Post)
  } catch (error) {
    return Promise.reject(error)
  }
}

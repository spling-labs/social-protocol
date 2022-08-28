import {
  convertDataUriToBlob,
  getKeypairFromSeed,
  getOrCreateShadowDriveAccount,
} from '../../utils/helpers'
import { FileData, Post, PostFileData, MediaData } from '../../types'
import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId, shadowDriveDomain } from '../../utils/constants'
import dayjs from 'dayjs'
import { UserChain } from '../../models'

/**
 * @category Post
 * @param groupId - The id of the group.
 * @param text - The text of the post.
 * @param image - The image of the post.
 */
export default async function createPost(
  groupId: string,
  text: string | null,
  image: FileData | null,
): Promise<Post> {
  try {
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

    // Fetch the user id.
    const fetchedUserProfile = await this.anchorProgram.account.userProfile.fetch(UserProfilePDA)
    const userChain = new UserChain(UserProfilePDA, fetchedUserProfile)

    // Get current timestamp.
    const timestamp: string = dayjs().unix().toString()

    // Generate the hash from the text.
    const hash: web3.Keypair = getKeypairFromSeed(
      `${timestamp}${userChain.userId.toString()}${groupId}`,
    )

    // Find post pda.
    const [PostPDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('post'), hash.publicKey.toBuffer()],
      programId,
    )

    // Create image file to upload.
    const postImageFile = image
      ? new File(
          [convertDataUriToBlob(image.base64)],
          `${PostPDA.toString()}.${image?.type.split('/')[1]}`,
        )
      : null

    // Create text tile to upload.
    const postTextFile = text
      ? new File([new Blob([text], { type: 'text/plain' })], `${PostPDA.toString()}.txt`)
      : null

    let fileSizeSummarized = 1024 // 1024 bytes will be reserved for the post.json.
    const filesToUpload: File[] = []

    if (postImageFile != null) {
      fileSizeSummarized += postImageFile.size
      filesToUpload.push(postImageFile)
    }

    if (postTextFile != null) {
      fileSizeSummarized += postTextFile.size
      filesToUpload.push(postTextFile)
    }

    // Find/Create shadow drive account.
    const account = await getOrCreateShadowDriveAccount(this.shadowDrive, fileSizeSummarized)

    // Generate the post json.
    const postJson: PostFileData = {
      timestamp: timestamp,
      programId: programId.toString(),
      userId: userChain.userId.toString(),
      groupId: groupId,
      text: text ? `${PostPDA.toString()}.txt` : null,
      media: image
        ? [
            {
              file: `${PostPDA.toString()}.${image.type.split('/')[1]}`,
              type: image.type.split('/')[1],
            } as MediaData,
          ]
        : [],
      license: null,
    }
    const fileToSave = new Blob([JSON.stringify(postJson)], { type: 'application/json' })
    filesToUpload.push(new File([fileToSave], `${PostPDA.toString()}.json`))

    // Upload all files to shadow drive.
    await this.shadowDrive.uploadMultipleFiles(account.publicKey, filesToUpload, 'v2')

    // Submit the post to the anchor program.
    await this.anchorProgram.methods
      .submitPost(Number(groupId), hash.publicKey)
      .accounts({
        user: this.wallet.publicKey,
        userProfile: UserProfilePDA,
        post: PostPDA,
        spling: SplingPDA,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc()

    return Promise.resolve({
      timestamp: Number(timestamp),
      publicKey: PostPDA,
      status: 1,
      programId: postJson.programId,
      userId: postJson.userId,
      groupId: postJson.groupId,
      text: text ? text : null,
      media: image ? [`${shadowDriveDomain}${account.publicKey}/${postJson.media[0].file}`] : [],
      license: postJson.license,
    } as Post)
  } catch (error) {
    return Promise.reject(error)
  }
}

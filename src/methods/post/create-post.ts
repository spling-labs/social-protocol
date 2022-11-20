import {
  convertDataUriToBlob,
  getKeypairFromSeed,
  getOrCreateShadowDriveAccount,
} from '../../utils/helpers'
import {
  FileData,
  Post,
  PostFileData,
  MediaData,
  PostUser,
  UserFileData,
  FileUriData,
} from '../../types'
import * as anchor from 'react-native-project-serum-anchor'
import { web3 } from 'react-native-project-serum-anchor'
import { isBrowser, programId, shadowDriveDomain } from '../../utils/constants'
import dayjs from 'dayjs'
import { PostChain, UserChain } from '../../models'
import { getMediaDataWithUrl } from './helpers'
import { getUserFileData } from '../user/helpers'
import { ShadowFile } from 'react-native-shadow-drive'
import RNFS from 'react-native-fs'

/**
 * @category Post
 * @param groupId - The id of the group.
 * @param text - The text of the post.
 * @param image - The image of the post.
 */
export default async function createPost(
  groupId: number,
  text: string | null,
  image: FileData | FileUriData | null,
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
      `${timestamp}${userChain.userId.toString()}${groupId.toString()}`,
    )

    // Find post pda.
    const [PostPDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('post'), hash.publicKey.toBuffer()],
      programId,
    )

    // Find likes pda.
    const [LikesPDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('likes'), PostPDA.toBuffer()],
      programId,
    )

    // Create image file to upload.
    let postImageFile = null

    if (!isBrowser) {
      postImageFile = image
        ? ({
            uri: (image as FileUriData).uri,
            name: `${PostPDA.toString()}.${image?.type.split('/')[1]}`,
            type: (image as FileUriData).type,
            size: (image as FileUriData).size,
            file: Buffer.from(''),
          } as ShadowFile)
        : null
    } else {
      postImageFile = image
        ? new File(
            [convertDataUriToBlob((image as FileData).base64)],
            `${PostPDA.toString()}.${image?.type.split('/')[1]}`,
          )
        : null
    }

    // Create text tile to upload.
    let postTextFile = null
    if (text !== null) {
      if (!isBrowser) {
        const postTextPath = `${RNFS.ExternalDirectoryPath}/${PostPDA.toString()}.txt`
        await RNFS.writeFile(postTextPath, text, 'utf8')
        const statResult = await RNFS.stat(postTextPath)
        const file = await RNFS.readFile(postTextPath, 'utf8')

        postTextFile = {
          uri: `file://${postTextPath}`,
          type: 'text/plain',
          file: Buffer.from(file, 'utf8'),
          name: `${PostPDA.toString()}.txt`,
          size: statResult.size,
        } as ShadowFile
      } else {
        postTextFile = new File(
          [new Blob([text], { type: 'text/plain' })],
          `${PostPDA.toString()}.txt`,
        )
      }
    }

    let fileSizeSummarized = 1024 // 1024 bytes will be reserved for the post.json.

    if (postImageFile != null) {
      fileSizeSummarized += postImageFile.size
    }

    if (postTextFile != null) {
      fileSizeSummarized += postTextFile.size
    }

    // Find bank pda.
    const [BankPDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('bank')],
      programId,
    )

    // Extract transaction costs from the bank.
    await this.anchorProgram.methods
      .extractBank()
      .accounts({
        user: this.wallet.publicKey,
        bank: BankPDA,
        spling: SplingPDA,
      })
      .rpc()

    // Find/Create shadow drive account.
    const account = await getOrCreateShadowDriveAccount(this.shadowDrive, fileSizeSummarized)

    // Upload post text and post image files.
    if (postImageFile != null) {
      await this.shadowDrive.uploadFile(
        account.publicKey,
        !isBrowser ? (postImageFile as ShadowFile) : (postImageFile as File),
      )
    }
    if (postTextFile != null) {
      await this.shadowDrive.uploadFile(
        account.publicKey,
        !isBrowser ? (postTextFile as ShadowFile) : (postTextFile as File),
      )
      if (!isBrowser) {
        RNFS.unlink(`${RNFS.ExternalDirectoryPath}/${PostPDA.toString()}.txt`)
      }
    }

    // Generate the post json.
    const postJson: PostFileData = {
      timestamp: timestamp,
      programId: programId.toString(),
      userId: userChain.userId.toString(),
      groupId: groupId.toString(),
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

    if (!isBrowser) {
      const postJSONPath = `${RNFS.ExternalDirectoryPath}/${PostPDA.toString()}.json`
      await RNFS.writeFile(postJSONPath, JSON.stringify(postJson), 'utf8')
      const statResult = await RNFS.stat(postJSONPath)
      const file = await RNFS.readFile(postJSONPath, 'utf8')

      const profileFile: ShadowFile = {
        uri: `file://${postJSONPath}`,
        type: 'application/json',
        file: Buffer.from(file, 'utf8'),
        name: `${PostPDA.toString()}.json`,
        size: statResult.size,
      }

      await this.shadowDrive.uploadFile(account.publicKey, profileFile)
      await RNFS.unlink(postJSONPath)
    } else {
      const fileToSave = new Blob([JSON.stringify(postJson)], { type: 'application/json' })
      const postJSONFile = new File([fileToSave], `${PostPDA.toString()}.json`)
      await this.shadowDrive.uploadFile(account.publicKey, postJSONFile)
    }

    // Submit the post to the anchor program.
    await this.anchorProgram.methods
      .submitPostWithLikes(groupId, hash.publicKey)
      .accounts({
        user: this.wallet.publicKey,
        userProfile: UserProfilePDA,
        post: PostPDA,
        likes: LikesPDA,
        spling: SplingPDA,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc()

    console.log(PostPDA)

    const post = await this.anchorProgram.account.post.fetch(PostPDA)
    const postChain = new PostChain(PostPDA, post)

    // Get user profile json file from the shadow drive.
    const userProfileJson: UserFileData = await getUserFileData(userChain.shdw)

    return Promise.resolve({
      timestamp: Number(timestamp),
      publicKey: PostPDA,
      status: 1,
      programId: postJson.programId,
      userId: Number(postJson.userId),
      postId: postChain.postId,
      groupId: Number(postJson.groupId),
      text: text ? text : null,
      media: getMediaDataWithUrl(postJson.media, account.publicKey),
      license: postJson.license,
      user: {
        publicKey: userChain.user,
        nickname: userProfileJson.nickname,
        avatar:
          userProfileJson.avatar != null
            ? `${shadowDriveDomain}${userChain.shdw.toString()}/${userProfileJson.avatar.file}`
            : null,
      } as PostUser,
      likes: [],
    } as Post)
  } catch (error) {
    return Promise.reject(error)
  }
}

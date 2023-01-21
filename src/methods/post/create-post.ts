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
import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { isBrowser, programId, shadowDriveDomain, SPLING_TOKEN_ACCOUNT_RECEIVER, SPLING_TOKEN_ADDRESS } from '../../utils/constants'
import dayjs from 'dayjs'
import { PostChain, UserChain } from '../../models'
import { getMediaDataWithUrl } from './helpers'
import { getUserFileData } from '../user/helpers'
import { ShadowFile } from 'react-native-shadow-drive'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'

/**
 * Creates a new post in the specific group with the given parameters.
 * 
 * @category Post
 * 
 * @param {number} groupId - The id of the group to post to.
 * @param {string | null} title - The title of the post
 * @param {string | null} text - The text (content) of the post
 * @param {FileData | FileUriData | null} file - The file to be posted (e.g. image / gif / video).
 * @param {string | null} tag - The tag to be associated with the post.
 * @param {any | null} metadata - An json object containing any relevant metadata to be associated with the post.
 * 
 * @returns {Promise<Post>} - A promise that resolves to the newly created post.
 */
export default async function createPost(
  groupId: number,
  title: string | null = null,
  text: string | null = null,
  file: FileData | FileUriData | null = null,
  tag: string | null = null,
  metadata: any | null = null,
): Promise<Post> {
  try {
    // Check if metadata object is a valid json.
    const metadataObject: any | null = metadata ? JSON.parse(JSON.stringify(metadata)) : null
    if (typeof metadataObject !== 'object') throw new Error('Invalid JSON object')

    // Find spling pda.
    const [SplingPDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('spling')],
      programId,
    )

    // Find the user profile pda.
    const [UserProfilePDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('user_profile'), this.wallet.publicKey.toBuffer()],
      programId,
    )

    // Fetch the user id.
    const fetchedUserProfile = await this.anchorProgram.account.userProfile.fetch(UserProfilePDA)
    const userChain = new UserChain(fetchedUserProfile)

    // Get current timestamp.
    const timestamp: string = dayjs().unix().toString()

    // Generate the hash from the text.
    const hash: web3.Keypair = getKeypairFromSeed(
      `${timestamp}${userChain.userId.toString()}${groupId.toString()}`,
    )

    // Find post pda.
    const [PostPDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('post'), hash.publicKey.toBuffer()],
      programId,
    )

    // Find likes pda.
    const [LikesPDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('likes'), PostPDA.toBuffer()],
      programId,
    )

    // Create file to upload.
    let postFile = null

    if (!isBrowser) {
      postFile = file
        ? ({
          uri: (file as FileUriData).uri,
          name: `${PostPDA.toString()}.${file?.type.split('/')[1]}`,
          type: (file as FileUriData).type,
          size: (file as FileUriData).size,
          file: Buffer.from(''),
        } as ShadowFile)
        : null
    } else {
      postFile = file
        ? new File(
          [convertDataUriToBlob((file as FileData).base64)],
          `${PostPDA.toString()}.${file?.type.split('/')[1]}`,
        )
        : null
    }

    // Create text tile to upload.
    let postTextFile = null
    if (text !== null) {
      if (!isBrowser) {
        const RNFS = require('react-native-fs')
        const postTextPath = `${RNFS.DocumentDirectoryPath}/${PostPDA.toString()}.txt`
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
    const filesToUpload: any[] = []

    if (postFile != null) {
      fileSizeSummarized += postFile.size
    }

    if (postTextFile != null) {
      fileSizeSummarized += postTextFile.size
    }

    // Find/Create shadow drive account.
    const account = await getOrCreateShadowDriveAccount(this.shadowDrive, fileSizeSummarized)

    // Upload post text and post file.
    if (postFile != null) {
      filesToUpload.push(!isBrowser ? (postFile as ShadowFile) : (postFile as File))
    }
    if (postTextFile != null) {
      filesToUpload.push(!isBrowser ? (postTextFile as ShadowFile) : (postTextFile as File))
    }

    // Generate the post json.
    const postJson: PostFileData = {
      timestamp: timestamp,
      programId: programId.toString(),
      userId: userChain.userId.toString(),
      groupId: groupId.toString(),
      title: title,
      text: text ? `${PostPDA.toString()}.txt` : null,
      media: file
        ? [
          {
            file: `${PostPDA.toString()}.${file.type.split('/')[1]}`,
            type: file.type.split('/')[1],
          } as MediaData,
        ]
        : [],
      license: null,
      metadata: metadataObject
    }

    if (!isBrowser) {
      const RNFS = require('react-native-fs')
      const postJSONPath = `${RNFS.DocumentDirectoryPath}/${PostPDA.toString()}.json`
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
      filesToUpload.push(profileFile)
    } else {
      const fileToSave = new Blob([JSON.stringify(postJson)], { type: 'application/json' })
      const postJSONFile = new File([fileToSave], `${PostPDA.toString()}.json`)
      filesToUpload.push(postJSONFile)
    }

    // Upload all files to shadow drive once.
    await this.shadowDrive.uploadFiles(account.publicKey, !isBrowser ? filesToUpload as ShadowFile[] : filesToUpload as File[])

    // Clear files from device if its react native.
    if (!isBrowser) {
      const RNFS = require('react-native-fs')

      // Remove post text file from device.
      if (postTextFile != null) {
        RNFS.unlink(`${RNFS.DocumentDirectoryPath}/${PostPDA.toString()}.txt`)
      }

      // Remove post json file from device.
      const postJSONPath = `${RNFS.DocumentDirectoryPath}/${PostPDA.toString()}.json`
      RNFS.unlink(postJSONPath)
    }

    // Find tags pda.
    const [TagsPDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('tags')],
      programId,
    )

    // Find bank pda.
    const [BankPDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('b')],
      programId,
    )

    // Submit the post to the anchor program.
    const transactionCosts = this.tokenAccount !== null ? new anchor.BN(2292880) : null
    await this.anchorProgram.methods
      .submitPost(groupId, hash.publicKey, tag ? tag : '', transactionCosts)
      .accounts({
        user: this.wallet.publicKey,
        spling: SplingPDA,
        userProfile: UserProfilePDA,
        post: PostPDA,
        tags: TagsPDA,
        likes: LikesPDA,
        b: BankPDA,
        receiver: this.wallet.publicKey,
        senderTokenAccount: this.tokenAccount ?? new PublicKey('2cDKYNjMNcDCxxxF7rauq8DgvNXD9r9BVLzKShPrJGUw'),
        receiverTokenAccount: SPLING_TOKEN_ACCOUNT_RECEIVER,
        mint: SPLING_TOKEN_ADDRESS,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc()

    // Fetch the post from the anchor program.
    let post = null
    while (post == null) {
      try {
        post = await this.anchorProgram.account.post.fetch(PostPDA)
      } catch (error) {
        // Nothing to do here.
      }
    }
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
      title: title ? title : null,
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
      tags: tag ? [tag] : [],
      metadata: metadataObject
    } as Post)
  } catch (error) {
    return Promise.reject(error)
  }
}

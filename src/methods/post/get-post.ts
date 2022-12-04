import * as anchor from 'react-native-project-serum-anchor'
import { web3 } from 'react-native-project-serum-anchor'
import { programId, shadowDriveDomain } from '../../utils/constants'
import { LikesChain, PostChain, TagsChain, UserChain } from '../../models'
import { Post, PostFileData, PostUser, UserFileData } from '../../types'
import { getMediaDataWithUrl, getPostFileData } from './helpers'
import { getTextFromFile } from '../../utils/helpers'
import { PostNotFoundError, UserNotFoundError } from '../../utils/errors'
import { bs58 } from 'react-native-project-serum-anchor/dist/cjs/utils/bytes'
import { getUserFileData } from '../user/helpers'

/**
 * @category Post
 * @param postId - the id of the post
 */
export default async function getPost(postId: number): Promise<Post | null> {
  try {
    // Fetch the post.
    const onChainPosts = await this.anchorProgram.account.post.all([
      {
        memcmp: {
          offset:
            8 + // Discriminator
            8 + // Timestamp
            4, // userId
          bytes: bs58.encode(Uint8Array.from([postId])),
        },
      },
    ])
    if (onChainPosts.length === 0) throw new PostNotFoundError()

    const post = onChainPosts[0]
    const postChain = new PostChain(post.publicKey, post)

    // Fetch the user profile.
    const onChainProfiles = await this.anchorProgram.account.userProfile.all([
      {
        memcmp: {
          offset:
            8 + // Discriminator
            8 + // Timestamp
            32, // user
          bytes: bs58.encode(Uint8Array.from([postChain.userId])),
        },
      },
    ])
    if (onChainProfiles.length === 0) throw new UserNotFoundError()

    const profile = onChainProfiles[0]
    const userChain = new UserChain(profile.account)

    const postFileData: PostFileData = await getPostFileData(postChain.publicKey, userChain.shdw)

    if (postFileData.text != null) {
      postFileData.text = await getTextFromFile(
        `${shadowDriveDomain}${userChain.shdw.toString()}/${postFileData.text}`,
      )
    }

    // Get user profile json file from the shadow drive.
    const userProfileJson: UserFileData = await getUserFileData(userChain.shdw)

    // Find likes pda.
    const [LikesPDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('likes'), postChain.publicKey.toBuffer()],
      programId,
    )

    // Get likes of the post.
    const likes = await this.anchorProgram.account.likes.fetch(LikesPDA)
    const likesChain = new LikesChain(LikesPDA, likes)

    // Find tags pda.
    const [TagsPDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('tags')],
      programId,
    )

    // Fetch tag.
    const tags = await this.anchorProgram.account.tags.fetch(TagsPDA)
    const tagsChain = new TagsChain(TagsPDA, tags)

    return Promise.resolve({
      timestamp: postChain.timestamp,
      publicKey: postChain.publicKey,
      status: postChain.status,
      programId: postFileData.programId,
      userId: Number(postFileData.userId),
      postId: postChain.postId,
      groupId: Number(postFileData.groupId),
      text: postFileData.text,
      media: getMediaDataWithUrl(postFileData.media, userChain.shdw),
      license: postFileData.license,
      user: {
        publicKey: userChain.user,
        nickname: userProfileJson.nickname,
        avatar:
          userProfileJson.avatar != null
            ? `${shadowDriveDomain}${userChain.shdw.toString()}/${userProfileJson.avatar.file}`
            : null,
      } as PostUser,
      likes: likesChain.users,
      tags: postChain.tagIndex ? [tagsChain.tags[postChain.tagIndex]] : []
    } as Post)
  } catch (error) {
    if (
      error.message.includes('Account does not exist') ||
      error instanceof UserNotFoundError ||
      error instanceof PostNotFoundError
    )
      return Promise.resolve(null)
    return Promise.reject(error)
  }
}

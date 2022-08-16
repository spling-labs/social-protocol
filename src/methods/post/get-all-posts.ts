import * as anchor from '@project-serum/anchor'
import { programId, shadowDriveDomain } from '../../utils/constants'
import { PostChain, UserChain } from '../../models'
import { Post, PostFileData } from '../../types'
import { getPostFileData } from './helpers'
import { convertNumberToBase58, getTextFromFile } from '../../utils/helpers'

/**
 * @category Post
 * @param groupId The group id where the post should be fetched.
 */
export default async function getAllPosts(groupId: string): Promise<Post[]> {
  try {
    const onChainPosts = await this.anchorProgram.account.post.all([
      {
        memcmp: {
          offset:
            8 + // Discriminator
            8 + // Timestamp
            4, // userId
          bytes: convertNumberToBase58(Number(groupId)),
        },
      },
    ])
    const posts: Post[] = []
    for (const post of onChainPosts) {
      try {
        const postChain = new PostChain(post.publicKey, post.account)

        // Find the user profile pda.
        const [UserProfilePDA] = await anchor.web3.PublicKey.findProgramAddress(
          [
            anchor.utils.bytes.utf8.encode('user_profile'),
            anchor.utils.bytes.utf8.encode(postChain.userId.toString()),
          ],
          programId,
        )

        // Fetch the user profile.
        const profile = await this.anchorProgram.account.userProfile.fetch(UserProfilePDA)
        const userChain = new UserChain(profile.publicKey, profile)

        const postFileData: PostFileData = await getPostFileData(
          postChain.publicKey,
          userChain.shdw,
        )

        if (postFileData.text != null) {
          postFileData.text = await getTextFromFile(
            `${shadowDriveDomain}${userChain.shdw.toString()}/${postFileData.text}`,
          )
        }

        // Push post data to array.
        posts.push({
          timestamp: postChain.timestamp,
          publicKey: postChain.publicKey,
          status: postChain.status,
          programId: postFileData.programId,
          userId: postFileData.userId,
          groupId: postFileData.groupId,
          text: postFileData.text,
          media:
            postFileData.media.length > 0
              ? [`${shadowDriveDomain}${userChain.shdw.toString()}/${postFileData.media[0].file}`]
              : [],
          license: postFileData.license,
        } as Post)
      } catch (error) {
        // Nothing to do.
      }
    }
    return Promise.resolve(posts)
  } catch (error) {
    Promise.reject(error)
  }
}

import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId, shadowDriveDomain } from '../../utils/constants'
import { PostChain, UserChain } from '../../models'
import { Post, PostFileData } from '../../types'
import { getPostFileData } from './helpers'
import { getTextFromFile } from '../../utils/helpers'

/**
 * @category Post
 * @param publicKey - the PublicKey of the post
 */
export default async function getPost(publicKey: web3.PublicKey): Promise<Post> {
  try {
    // Fetch the post from the anchor program.
    const post = await this.anchorProgram.account.post.fetch(publicKey)
    const postChain = new PostChain(publicKey, post)

    // Find the user profile pda.
    const [UserProfilePDA] = await web3.PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('user_profile'),
        anchor.utils.bytes.utf8.encode(postChain.userId.toString()),
      ],
      programId,
    )

    // Fetch the user profile.
    const profile = await this.anchorProgram.account.userProfile.fetch(UserProfilePDA)
    const userChain = new UserChain(profile.publicKey, profile)

    const postFileData: PostFileData = await getPostFileData(publicKey, userChain.shdw)

    if (postFileData.text != null) {
      postFileData.text = await getTextFromFile(
        `${shadowDriveDomain}${userChain.shdw.toString()}/${postFileData.text}`,
      )
    }

    return Promise.resolve({
      timestamp: postChain.timestamp,
      publicKey: publicKey,
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
    return Promise.reject(error)
  }
}

import { web3 } from '@project-serum/anchor'
import { shadowDriveDomain } from '../../utils/constants'
import { PostChain, UserChain } from '../../models'
import { Post, PostFileData } from '../../types'
import { getPostFileData } from './helpers'
import { convertNumberToBase58, getTextFromFile } from '../../utils/helpers'
import { UserNotFoundError } from '../../utils/errors'

/**
 * @category Post
 * @param publicKey - the PublicKey of the post
 */
export default async function getPost(publicKey: web3.PublicKey): Promise<Post> {
  try {
    // Fetch the post from the anchor program.
    const post = await this.anchorProgram.account.post.fetch(publicKey)
    const postChain = new PostChain(publicKey, post)

    // Fetch the user profile.
    const onChainProfiles = await this.anchorProgram.account.userProfile.all([
      {
        memcmp: {
          offset:
            8 + // Discriminator
            8 + // Timestamp
            32, // user
          bytes: convertNumberToBase58(postChain.userId),
        },
      },
    ])
    if (onChainProfiles.length === 0) throw new UserNotFoundError()

    const profile = onChainProfiles[0]
    const userChain = new UserChain(profile.publicKey, profile.account)

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

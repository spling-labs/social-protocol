import { getKeypairFromSeed } from '../../utils/helpers'
import * as anchor from 'react-native-project-serum-anchor'
import { web3 } from 'react-native-project-serum-anchor'
import { programId } from '../../utils/constants'
import { PostChain, UserChain } from '../../models'
import { PostFileData } from 'index'
import { getPostFileData } from './helpers'

/**
 * @category Post
 * @param publicKey - The public key of the post.
 */
export default async function likePost(publicKey: web3.PublicKey): Promise<void> {
  try {
    const post = await this.anchorProgram.account.post.fetch(publicKey)
    const postChain = new PostChain(publicKey, post)

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

    // Get the post file data.
    const postFileData: PostFileData = await getPostFileData(publicKey, userChain.shdw)

    // Generate the hash from the text.
    const hash: web3.Keypair = getKeypairFromSeed(
      `${postFileData.timestamp}${userChain.userId.toString()}${postChain.groupId.toString()}`,
    )

    // Find post pda.
    const [PostPDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('post'), hash.publicKey.toBuffer()],
      programId,
    )

    // Find likes pda.
    const [LikesPDA] = await web3.PublicKey.findProgramAddress(
      [
        anchor.utils.bytes.utf8.encode('likes'),
        PostPDA.toBuffer(),
      ],
      programId
    )

    // Submit the post to the anchor program.
    await this.anchorProgram.methods
      .likePost()
      .accounts({
        user: this.wallet.publicKey,
        userProfile: UserProfilePDA,
        post: PostPDA,
        likes: LikesPDA,
        spling: SplingPDA,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc()

    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}

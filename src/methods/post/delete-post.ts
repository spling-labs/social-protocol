import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId, shadowDriveDomain } from '../../utils/constants'
import { PostChain, UserChain } from '../../models'
import { PostFileData } from '../../types'
import { getPostFileData } from './helpers'
import { getKeypairFromSeed } from '../../utils/helpers'

/**
 * @category Post
 * @param publicKey - the PublicKey of the post
 */
export default async function deletePost(publicKey: web3.PublicKey): Promise<void> {
  try {
    // Fetch the post from the anchor program.
    const post = await this.anchorProgram.account.post.fetch(publicKey)
    const postChain = new PostChain(publicKey, post)

    // Find the user profile pda.
    const [UserProfilePDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('user_profile'), this.wallet.publicKey.toBuffer()],
      programId,
    )

    // Fetch the user profile.
    const profile = await this.anchorProgram.account.userProfile.fetch(UserProfilePDA)
    const userChain = new UserChain(profile.publicKey, profile)

    // Check if the user owns the post.
    if (postChain.userId !== userChain.userId)
      throw new Error('The post can be deleted only by the creator.')

    const postFileData: PostFileData = await getPostFileData(publicKey, userChain.shdw)

    // Remove text file.
    if (postFileData.text != null) {
      try {
        await this.shadowDrive.deleteFile(
          userChain.shdw.toString(),
          `${shadowDriveDomain}${userChain.shdw.toString()}/${postFileData.text}`,
          'v2',
        )
      } catch (error) {
        // Nothing to do here.
      }
    }

    // Remove all media files from post from the shadow drive.
    for (const m in postFileData.media) {
      try {
        const media = postFileData.media[m]
        await this.shadowDrive.deleteFile(
          userChain.shdw.toString(),
          `${shadowDriveDomain}${userChain.shdw.toString()}/${media.file}`,
          'v2',
        )
      } catch (error) {
        // Nothing to do here.
      }
    }

    // Delete post json file from the shadow drive.
    try {
      await this.shadowDrive.deleteFile(
        userChain.shdw.toString(),
        `${shadowDriveDomain}${userChain.shdw.toString()}/${publicKey.toString()}.json`,
        'v2',
      )
    } catch (error) {
      // Nothing to do here.
    }

    // Generate the post hash.
    const hash: web3.Keypair = getKeypairFromSeed(
      `${postFileData.timestamp}${postChain.userId.toString()}${postChain.groupId.toString()}`,
    )

    // Find spling pda.
    const [SplingPDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('spling')],
      programId,
    )

    // Find post pda.
    const [PostPDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('post'), hash.publicKey.toBuffer()],
      programId,
    )

    // Submit the post to the anchor program.
    await this.anchorProgram.methods
      .deletePost(postChain.groupId, hash.publicKey)
      .accounts({
        user: this.wallet.publicKey,
        userProfile: UserProfilePDA,
        post: PostPDA,
        spling: SplingPDA,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc()

    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}

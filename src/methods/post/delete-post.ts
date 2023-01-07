import * as anchor from 'react-native-project-serum-anchor'
import { web3 } from 'react-native-project-serum-anchor'
import { programId, shadowDriveDomain, SPLING_TOKEN_ACCOUNT_RECEIVER, SPLING_TOKEN_ADDRESS } from '../../utils/constants'
import { PostChain, UserChain } from '../../models'
import { PostFileData } from '../../types'
import { getPostFileData } from './helpers'
import { getKeypairFromSeed } from '../../utils/helpers'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

/**
 * Delete a post by the given public key.
 * 
 * @category Post
 * 
 * @param publicKey - The public key of the post to be deleted.
 * 
 * @returns {Promise<void>} A promise that resolves when the post has been deleted.
 */
export default async function deletePost(publicKey: web3.PublicKey): Promise<void> {
  try {
    // Fetch the post from the anchor program.
    const post = await this.anchorProgram.account.post.fetch(publicKey)
    const postChain = new PostChain(publicKey, post)

    // Find the user profile pda.
    const [UserProfilePDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('user_profile'), this.wallet.publicKey.toBuffer()],
      programId,
    )

    // Fetch the user profile.
    const profile = await this.anchorProgram.account.userProfile.fetch(UserProfilePDA)
    const userChain = new UserChain(profile)

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
    const [SplingPDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('spling')],
      programId,
    )

    // Find post pda.
    const [PostPDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('post'), hash.publicKey.toBuffer()],
      programId,
    )

    // Find bank pda.
    const [BankPDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('b')],
      programId,
    )

    // Submit the post to the anchor program.
    const transactionCosts = this.tokenAccount !== null ? new anchor.BN(10000) : null
    await this.anchorProgram.methods
      .deletePost(postChain.groupId, hash.publicKey, transactionCosts)
      .accounts({
        user: this.wallet.publicKey,
        userProfile: UserProfilePDA,
        post: PostPDA,
        spling: SplingPDA,
        b: BankPDA,
        receiver: this.wallet.publicKey,
        senderTokenAccount: this.tokenAccount,
        receiverTokenAccount: SPLING_TOKEN_ACCOUNT_RECEIVER,
        mint: SPLING_TOKEN_ADDRESS,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc()

    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}

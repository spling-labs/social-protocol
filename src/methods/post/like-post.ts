import { getKeypairFromSeed } from '../../utils/helpers'
import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId, SPLING_TOKEN_ACCOUNT_RECEIVER, SPLING_TOKEN_ADDRESS } from '../../utils/constants'
import { PostChain, UserChain } from '../../models'
import { PostFileData } from 'index'
import { getPostFileData } from './helpers'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'

/**
 * @category Post
 * @param publicKey - The public key of the post.
 */
export default async function likePost(publicKey: web3.PublicKey): Promise<void> {
  try {
    const post = await this.anchorProgram.account.post.fetch(publicKey)
    const postChain = new PostChain(publicKey, post)

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

    // Get the post file data.
    const postFileData: PostFileData = await getPostFileData(publicKey, userChain.shdw)

    // Generate the hash from the text.
    const hash: web3.Keypair = getKeypairFromSeed(
      `${postFileData.timestamp}${userChain.userId.toString()}${postChain.groupId.toString()}`,
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

    // Find bank pda.
    const [BankPDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('b')],
      programId,
    )

    // Submit the post to the anchor program.
    const transactionCosts = this.tokenAccount !== null ? new anchor.BN(10000) : null
    await this.anchorProgram.methods
      .likePost(transactionCosts)
      .accounts({
        user: this.wallet.publicKey,
        userProfile: UserProfilePDA,
        post: PostPDA,
        likes: LikesPDA,
        spling: SplingPDA,
        b: BankPDA,
        receiver: this.wallet.publicKey,
        senderTokenAccount: this.tokenAccount ?? new PublicKey("2cDKYNjMNcDCxxxF7rauq8DgvNXD9r9BVLzKShPrJGUw"),
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

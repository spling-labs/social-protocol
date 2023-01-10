import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId, shadowDriveDomain, SPLING_TOKEN_ACCOUNT_RECEIVER, SPLING_TOKEN_ADDRESS } from '../../utils/constants'
import { UserChain } from '../../models'
import { UserFileData } from '../../types'
import { getUserFileData } from './helpers'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'
import { PublicKey } from '@solana/web3.js'

/**
 * Deletes a user.
 * 
 * @category User
 * 
 * @returns {Promise<void>} A promise that resolves when the user was successfully deleted.
 */
export default async function deleteUser(): Promise<void> {
  try {
    // Find the user profile pda.
    const [UserProfilePDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('user_profile'), this.wallet.publicKey.toBuffer()],
      programId,
    )

    // Fetch the user profile.
    const profile = await this.anchorProgram.account.userProfile.fetch(UserProfilePDA)
    const userChain = new UserChain(profile)

    const userFileData: UserFileData = await getUserFileData(userChain.shdw)

    // Remove avatar file.
    if (userFileData.avatar != null) {
      await this.shadowDrive.deleteFile(
        userChain.shdw.toString(),
        `${shadowDriveDomain}${userChain.shdw.toString()}/${userFileData.avatar.file}`,
        'v2',
      )
    }

    // Remove banner file.
    if (userFileData.banner != null) {
      await this.shadowDrive.deleteFile(
        userChain.shdw.toString(),
        `${shadowDriveDomain}${userChain.shdw.toString()}/${userFileData.banner.file}`,
        'v2',
      )
    }

    // Delete profile json file from the shadow drive.
    await this.shadowDrive.deleteFile(
      userChain.shdw.toString(),
      `${shadowDriveDomain}${userChain.shdw.toString()}/profile.json`,
      'v2',
    )

    // Find spling pda.
    const [SplingPDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('spling')],
      programId,
    )

    // Find bank pda.
    const [BankPDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('b')],
      programId,
    )

    // Delete the user profile on the anchor program.
    const transactionCosts = this.tokenAccount !== null ? new anchor.BN(10000) : null
    await this.anchorProgram.methods
      .deleteUserProfile(userChain.userId, userChain.shdw, transactionCosts)
      .accounts({
        user: this.wallet.publicKey,
        spling: SplingPDA,
        userProfile: UserProfilePDA,
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

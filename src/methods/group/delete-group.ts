import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId, shadowDriveDomain, SPLING_TOKEN_ACCOUNT_RECEIVER, SPLING_TOKEN_ADDRESS } from '../../utils/constants'
import { GroupChain } from '../../models'
import { GroupFileData } from '../../types'
import { getGroupFileData } from './helpers'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

/**
 * Deletes own user group.
 * 
 * @category Group
 * 
 * @returns {Promise<void>} A promise that resolves when the group has been successfully deleted.
 */
export default async function deleteGroup(): Promise<void> {
  try {
    // Find the group profile pda.
    const [GroupProfilePDA] = web3.PublicKey.findProgramAddressSync(
      [anchor.utils.bytes.utf8.encode('group_profile'), this.wallet.publicKey.toBuffer()],
      programId,
    )

    // Fetch the user profile.
    const groupProfile = await this.anchorProgram.account.groupProfile.fetch(GroupProfilePDA)
    const groupChain = new GroupChain(groupProfile.publicKey, groupProfile)

    const groupFileData: GroupFileData = await getGroupFileData(groupChain.shdw)
 
    // Remove avatar file.
    if (groupFileData.avatar != null) {
      try {
        await this.shadowDrive.deleteFile(
          groupChain.shdw.toString(),
          `${shadowDriveDomain}${groupChain.shdw.toString()}/${groupFileData.avatar.file}`,
          'v2',
        )
      } catch (error) {
        // Nothing to do here.
      }
    }

    // Remove banner file.
    if (groupFileData.banner != null) {
      try {
        await this.shadowDrive.deleteFile(
          groupChain.shdw.toString(),
          `${shadowDriveDomain}${groupChain.shdw.toString()}/${groupFileData.banner.file}`,
          'v2',
        )
      } catch (error) {
        // Nothing to do here.
      }
    }

    // Delete group json file from the shadow drive.
    try {
      await this.shadowDrive.deleteFile(
        groupChain.shdw.toString(),
        `${shadowDriveDomain}${groupChain.shdw.toString()}/group.json`,
        'v2',
      )
    } catch (error) {
      // Nothing to do here.
    }

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

    // Delete the group on the anchor program.
    const transactionCosts = this.tokenAccount !== null ? new anchor.BN(10000) : null
    await this.anchorProgram.methods
      .deleteGroupProfile(groupChain.shdw, transactionCosts)
      .accounts({
        user: this.wallet.publicKey,
        spling: SplingPDA,
        groupProfile: GroupProfilePDA,
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

import * as anchor from '@project-serum/anchor'
import { web3 } from '@project-serum/anchor'
import { programId, shadowDriveDomain } from '../../utils/constants'
import { GroupChain } from '../../models'
import { GroupFileData } from '../../types'
import { getGroupFileData } from './helpers'

/**
 * @category Group
 */
export default async function deleteGroup(): Promise<void> {
  try {
    // Find the group profile pda.
    const [GroupProfilePDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('group_profile'), this.wallet.publicKey.toBuffer()],
      programId,
    )

    // Fetch the user profile.
    const groupProfile = await this.anchorProgram.account.groupProfile.fetch(GroupProfilePDA)
    const groupChain = new GroupChain(groupProfile.publicKey, groupProfile)

    const groupFileData: GroupFileData = await getGroupFileData(groupChain.shdw)

    // Remove avatar file.
    if (groupFileData.avatar != null) {
      await this.shadowDrive.deleteFile(
        groupChain.shdw.toString(),
        `${shadowDriveDomain}${groupChain.shdw.toString()}/${groupFileData.avatar.file}`,
        'v2',
      )
    }

    // Remove banner file.
    if (groupFileData.banner != null) {
      await this.shadowDrive.deleteFile(
        groupChain.shdw.toString(),
        `${shadowDriveDomain}${groupChain.shdw.toString()}/${groupFileData.banner.file}`,
        'v2',
      )
    }

    // Delete group json file from the shadow drive.
    await this.shadowDrive.deleteFile(
      groupChain.shdw.toString(),
      `${shadowDriveDomain}${groupChain.shdw.toString()}/group.json`,
      'v2',
    )

    // Find spling pda.
    const [SplingPDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('spling')],
      programId,
    )

    // Delete the group on the anchor program.
    await this.anchorProgram.methods
      .deleteGroupProfile(groupChain.shdw)
      .accounts({
        user: this.wallet.publicKey,
        spling: SplingPDA,
        groupProfile: GroupProfilePDA,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc()

    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}

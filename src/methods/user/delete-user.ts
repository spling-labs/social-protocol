import * as anchor from 'react-native-project-serum-anchor'
import { web3 } from 'react-native-project-serum-anchor'
import { programId, shadowDriveDomain } from '../../utils/constants'
import { UserChain } from '../../models'
import { UserFileData } from '../../types'
import { getUserFileData } from './helpers'

/**
 * @category User
 */
export default async function deleteUser(): Promise<void> {
  try {
    // Find the user profile pda.
    const [UserProfilePDA] = await web3.PublicKey.findProgramAddress(
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
    const [SplingPDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('spling')],
      programId,
    )

    // Delete the user profile on the anchor program.
    await this.anchorProgram.methods
      .deleteUserProfile(userChain.userId, userChain.shdw)
      .accounts({
        user: this.wallet.publicKey,
        spling: SplingPDA,
        userProfile: UserProfilePDA,
        systemProgram: anchor.web3.SystemProgram.programId,
      })
      .rpc()

    return Promise.resolve()
  } catch (error) {
    return Promise.reject(error)
  }
}

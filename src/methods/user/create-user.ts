import { convertDataUriToBlob, getOrCreateShadowDriveAccount } from '../../utils/helpers'
import { FileData, FileUriData, MediaData, User, UserFileData } from '../../types'
import * as anchor from 'react-native-project-serum-anchor'
import { web3 } from 'react-native-project-serum-anchor'
import { isBrowser, programId, shadowDriveDomain, SPLING_TOKEN_ACCOUNT_RECEIVER, SPLING_TOKEN_ADDRESS } from '../../utils/constants'
import { ShadowFile, StorageAccountResponse } from 'react-native-shadow-drive'
import { UserChain } from '../../models'
import dayjs from 'dayjs'
import { SocialIDL } from '../../utils/idl'
import { TOKEN_PROGRAM_ID } from '@solana/spl-token'

/**
 * @category User
 * @param nickname - The nickname of the user.
 * @param avatar - The image FileData of the user avatar.
 * @param biography - The biography of the user.
 */
export default async function createUser(
  nickname: string,
  avatar: FileData | FileUriData | null,
  biography: string | null,
): Promise<User> {
  try {
    // Generate avatar file to upload.
    let userAvatarFile = null

    if (!isBrowser) {
      userAvatarFile = avatar
        ? ({
          uri: (avatar as FileUriData).uri,
          name: `profile-avatar.${avatar.type.split('/')[1]}`,
          type: (avatar as FileUriData).type,
          size: (avatar as FileUriData).size,
          file: Buffer.from(''),
        } as ShadowFile)
        : null
    } else {
      userAvatarFile = avatar
        ? new File(
          [convertDataUriToBlob((avatar as FileData).base64)],
          `profile-avatar.${avatar.type.split('/')[1]}`,
        )
        : null
    }

    let fileSizeSummarized = 1024 // 1024 bytes will be reserved for the userProfile.json.

    // Summarize size of files.
    if (userAvatarFile != null) {
      fileSizeSummarized += avatar.size
    }

    // Find spling pda.
    const [SplingPDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('spling')],
      programId,
    )

    if (this.tokenAccount !== null) {
      // Find bank pda.
      const [BankPDA] = await web3.PublicKey.findProgramAddress(
        [anchor.utils.bytes.utf8.encode('b')],
        programId,
      )

      // Extract transaction costs from the bank.
      await this.anchorProgram.methods
        .extractBank(new anchor.BN(6458000))
        .accounts({
          user: this.wallet.publicKey,
          spling: SplingPDA,
          b: BankPDA,
          receiver: this.wallet.publicKey,
          senderTokenAccount: this.tokenAccount,
          receiverTokenAccount: SPLING_TOKEN_ACCOUNT_RECEIVER,
          mint: SPLING_TOKEN_ADDRESS,
          tokenProgram: TOKEN_PROGRAM_ID,
        })
        .rpc()
    }

    // Find/Create shadow drive account.
    const account: StorageAccountResponse = await getOrCreateShadowDriveAccount(
      this.shadowDrive,
      fileSizeSummarized,
    )

    // Upload image file to shadow drive.
    if (userAvatarFile != null) {
      await this.shadowDrive.uploadFile(
        account.publicKey,
        !isBrowser ? (userAvatarFile as ShadowFile) : (userAvatarFile as File),
      )
    }

    // Generate the user profile json.
    const userProfileJson: UserFileData = {
      timestamp: dayjs().unix().toString(),
      nickname: nickname,
      bio: biography ? biography : '',
      avatar: userAvatarFile
        ? ({
          file: `profile-avatar.${avatar.type.split('/')[1]}`,
          type: avatar.type.split('/')[1],
        } as MediaData)
        : null,
      banner: null,
      socials: [],
      license: null,
    }

    let profileFile
    if (!isBrowser) {
      const RNFS = require('react-native-fs')
      const profileJSONPath = `${RNFS.ExternalDirectoryPath}/profile.json`
      await RNFS.writeFile(profileJSONPath, JSON.stringify(userProfileJson), 'utf8')
      const statResult = await RNFS.stat(profileJSONPath)
      const file = await RNFS.readFile(profileJSONPath, 'utf8')

      profileFile = {
        uri: `file://${profileJSONPath}`,
        type: 'application/json',
        file: Buffer.from(file, 'utf8'),
        name: 'profile.json',
        size: statResult.size,
      } as ShadowFile
    } else {
      const fileToSave = new Blob([JSON.stringify(userProfileJson)], { type: 'application/json' })
      profileFile = new File([fileToSave], 'profile.json')
    }

    // Find the user profile pda.
    const [UserProfilePDA] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode('user_profile'), this.wallet.publicKey.toBuffer()],
      programId,
    )

    const [, ,] = await Promise.all([
      this.shadowDrive.uploadFile(
        account.publicKey,
        !isBrowser ? (profileFile as ShadowFile) : (profileFile as File),
      ),
      submitUserProfileToAnchorProgram(
        this.anchorProgram,
        this.wallet.publicKey,
        account.publicKey,
        SplingPDA,
        UserProfilePDA,
      ),
    ])

    if (profileFile !== null && !isBrowser) {
      const RNFS = require('react-native-fs')
      RNFS.unlink(`${RNFS.ExternalDirectoryPath}/profile.json`)
    }

    // Fetch created user profile.
    const userProfile = this.anchorProgram.account.userProfile.fetch(UserProfilePDA)
    const userChain = new UserChain(userProfile)

    return Promise.resolve({
      timestamp: userChain.timestamp,
      publicKey: userChain.publicKey,
      userId: userChain.userId,
      status: userChain.status,
      shdw: account.publicKey,
      following: [],
      groups: [],
      nickname: nickname,
      bio: biography ? biography : '',
      avatar: userAvatarFile
        ? `${shadowDriveDomain}${account.publicKey}/${userProfileJson.avatar.file}`
        : null,
      banner: null,
      socials: userProfileJson.socials,
      license: userProfileJson.license,
    } as User)
  } catch (error) {
    return Promise.reject(error)
  }
}

// Submit the user profile to the anchor program.
async function submitUserProfileToAnchorProgram(
  anchorProgram: anchor.Program<SocialIDL>,
  walletPublicKey: web3.PublicKey,
  accountPublicKey: web3.PublicKey,
  SplingPDA: web3.PublicKey,
  UserProfilePDA: web3.PublicKey,
): Promise<string> {
  return anchorProgram.methods
    .createUserProfile(accountPublicKey)
    .accounts({
      user: walletPublicKey,
      spling: SplingPDA,
      userProfile: UserProfilePDA,
      systemProgram: anchor.web3.SystemProgram.programId,
    })
    .rpc()
}

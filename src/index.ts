import { Program, web3 } from '@project-serum/anchor'
import { ShdwDrive } from '@shadow-drive/sdk'
import {
  createPost,
  createReply,
  createSpling,
  createUser,
  getAllPosts,
  getAllReplies,
  getAllSplings,
  getPost,
  getReply,
  getSpling,
  getUser,
  sendTip,
  updatePost,
  updateReply,
  updateSpling,
  updateUser,
  deleteUser,
} from './methods'
import { FileData, Post, Reply, Spling, TipSize, User } from './types'
import { createSocialProtocolProgram } from './utils/helpers'
import { SocialIDL } from './utils/idl'
import { UserNotFoundError, InvalidHashError } from './utils/errors'

interface SplingProtocol {
  // USER METHODS
  createUser(username: string, avatar: FileData, biography: string): Promise<User>
  updateUser(username: string, avatar: FileData, biography: string): Promise<User>
  deleteUser(): Promise<void>
  getUser(publicKey: web3.PublicKey): Promise<User>

  // SPLING METHODS
  createSpling(name: string, bio: string | null, image: FileData | null): Promise<Spling>
  updateSpling(spling: Spling): Promise<Spling>
  getSpling(publicKey: web3.PublicKey): Promise<Spling>
  getAllSplings(): Promise<Spling[]>

  // POST METHODS
  createPost(text: string, image: FileData, index: number): Promise<Post>
  updatePost(post: Post): Promise<Post>
  getPost(publicKey: web3.PublicKey): Promise<Post>
  getAllPosts(): Promise<Post[]>

  // REPLY METHODS
  createReply(reply: Reply): Promise<Reply>
  updateReply(reply: Reply): Promise<Reply>
  getReply(publicKey: web3.PublicKey): Promise<Reply>
  getAllReplies(): Promise<Reply[]>

  // TIP METHODS
  sendTip(
    senderPublicKey: web3.PublicKey,
    receiverPublicKey: web3.PublicKey,
    tipSize: TipSize,
  ): Promise<void>
}

export class SocialProtocol implements SplingProtocol {
  private anchorProgram: Program<SocialIDL>
  private shadowDrive: ShdwDrive

  // USER METHODS
  createUser = createUser
  updateUser = updateUser
  deleteUser = deleteUser
  getUser = getUser

  // SPLING METHODS
  createSpling = createSpling
  updateSpling = updateSpling
  getSpling = getSpling
  getAllSplings = getAllSplings

  // POST METHODS
  createPost = createPost
  updatePost = updatePost
  getPost = getPost
  getAllPosts = getAllPosts

  // REPLY METHODS
  createReply = createReply
  updateReply = updateReply
  getReply = getReply
  getAllReplies = getAllReplies

  // TIP METHODS
  sendTip = sendTip

  /**
   *
   * @param connection The web3 connection object.
   * @param wallet - The wallet of the current user.
   */
  constructor(private connection: web3.Connection, private wallet: any) {
    this.connection = connection
    this.wallet = wallet
    this.anchorProgram = createSocialProtocolProgram(connection, wallet)
  }

  public async init(): Promise<SocialProtocol> {
    if (!this.wallet && !this.wallet.publicKey) return
    this.shadowDrive = await new ShdwDrive(this.connection, this.wallet).init()
    return this
  }
}

export { User, TipSize, Post, Spling, Reply, FileData }
export { UserNotFoundError, InvalidHashError }

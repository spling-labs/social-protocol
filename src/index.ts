import { Program, Wallet, web3 } from 'react-native-project-serum-anchor'
import { ShdwDrive } from 'react-native-shadow-drive'
import {
  createPost,
  createGroup,
  createUser,
  getAllPosts,
  getAllGroups,
  getUserGroup,
  joinGroup,
  leaveGroup,
  deleteGroup,
  getPost,
  getPostByPublicKey,
  getGroup,
  getGroupByPublicKey,
  getUser,
  getUserByPublicKey,
  deleteUser,
  followUser,
  unfollowUser,
  deletePost,
  likePost,
  createPostReply,
  getPostReply,
  getAllPostReplies,
  deletePostReply,
} from './methods'
import { FileData, Post, PostUser, Reply, Group, User, FileUriData } from './types'
import { createSocialProtocolProgram } from './utils/helpers'
import { SocialIDL } from './utils/idl'
import {
  UserNotFoundError,
  GroupNotFoundError,
  PostNotFoundError,
  InvalidHashError,
  StorageAccountNotFoundError,
} from './utils/errors'
import { AnchorWallet } from './utils/AnchorWallet'

interface SplingProtocol {
  // USER METHODS
  createUser(
    username: string,
    avatar: FileData | FileUriData | null,
    biography: string,
  ): Promise<User>
  getUser(userId: number): Promise<User | null>
  getUserByPublicKey(publicKey: web3.PublicKey): Promise<User | null>
  deleteUser(): Promise<void>
  followUser(userId: number): Promise<void>
  unfollowUser(userId: number): Promise<void>

  // GROUP METHODS
  createGroup(
    name: string,
    bio: string | null,
    avatar: FileData | FileUriData | null,
  ): Promise<Group>
  getGroup(groupId: number): Promise<Group | null>
  getGroupByPublicKey(publicKey: web3.PublicKey): Promise<Group | null>
  getUserGroup(publicKey: web3.PublicKey): Promise<Group | null>
  getAllGroups(): Promise<Group[]>
  joinGroup(groupId: number): Promise<void>
  leaveGroup(groupId: number): Promise<void>
  deleteGroup(): Promise<void>

  // POST METHODS
  createPost(
    groupId: number,
    text: string | null,
    image: FileData | FileUriData | null,
  ): Promise<Post>
  getPost(postId: number): Promise<Post | null>
  getPostByPublicKey(publicKey: web3.PublicKey): Promise<Post | null>
  getAllPosts(groupId: number): Promise<Post[]>
  deletePost(publicKey: web3.PublicKey): Promise<void>
  likePost(publicKey: web3.PublicKey): Promise<void>

  // REPLY METHODS
  createPostReply(postId: number, text: string): Promise<Reply>
  getPostReply(publicKey: web3.PublicKey): Promise<Reply | null>
  getAllPostReplies(postId: number): Promise<Reply[]>
  deletePostReply(publicKey: web3.PublicKey): Promise<void>
}

export class SocialProtocol implements SplingProtocol {
  private anchorProgram: Program<SocialIDL>
  private shadowDrive: ShdwDrive
  private connection: web3.Connection
  private wallet: Wallet

  // USER METHODS
  createUser = createUser
  getUser = getUser
  getUserByPublicKey = getUserByPublicKey
  deleteUser = deleteUser
  followUser = followUser
  unfollowUser = unfollowUser

  // GROUP METHODS
  createGroup = createGroup
  getGroup = getGroup
  getGroupByPublicKey = getGroupByPublicKey
  getUserGroup = getUserGroup
  getAllGroups = getAllGroups
  joinGroup = joinGroup
  leaveGroup = leaveGroup
  deleteGroup = deleteGroup

  // POST METHODS
  createPost = createPost
  getPost = getPost
  getPostByPublicKey = getPostByPublicKey
  getAllPosts = getAllPosts
  deletePost = deletePost
  likePost = likePost

  // REPLY METHODS
  createPostReply = createPostReply
  getPostReply = getPostReply
  getAllPostReplies = getAllPostReplies
  deletePostReply = deletePostReply

  /**
   *
   * @param rpcUrl The solana rpc node url endpoint.
   * @param wallet - The wallet of the current user.
   */
  constructor(rpcUrl: string | null = null, wallet: Wallet | web3.Keypair) {
    this.connection = new web3.Connection(
      rpcUrl ? rpcUrl : 'https://api.mainnet-beta.solana.com/',
      'confirmed',
    )
    this.wallet = wallet instanceof web3.Keypair ? new AnchorWallet(wallet) : wallet
    this.anchorProgram = createSocialProtocolProgram(this.connection, this.wallet)
  }

  public async init(): Promise<SocialProtocol> {
    if (!this.wallet && !this.wallet.publicKey) return
    this.shadowDrive = await new ShdwDrive(this.connection, this.wallet).init()
    return this
  }

  public getConnection(): web3.Connection {
    return this.connection
  }
}

export { User, Post, PostUser, Group, Reply, FileData, FileUriData }
export {
  UserNotFoundError,
  GroupNotFoundError,
  PostNotFoundError,
  InvalidHashError,
  StorageAccountNotFoundError,
}

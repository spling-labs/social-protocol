import { Program, web3 } from '@project-serum/anchor'
import { ShdwDrive } from '@shadow-drive/sdk'
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
  getGroup,
  getGroupByPublicKey,
  getUser,
  getUserByPublicKey,
  deleteUser,
  followUser,
  unfollowUser,
  deletePost,
} from './methods'
import { FileData, Post, Reply, Group, User } from './types'
import { createSocialProtocolProgram } from './utils/helpers'
import { SocialIDL } from './utils/idl'
import {
  UserNotFoundError,
  GroupNotFoundError,
  PostNotFoundError,
  InvalidHashError,
  StorageAccountNotFoundError,
} from './utils/errors'

interface SplingProtocol {
  // USER METHODS
  createUser(username: string, avatar: FileData, biography: string): Promise<User>
  getUser(userId: number): Promise<User>
  getUserByPublicKey(publicKey: web3.PublicKey): Promise<User | null>
  deleteUser(): Promise<void>
  followUser(userId: number): Promise<void>
  unfollowUser(userId: number): Promise<void>

  // GROUP METHODS
  createGroup(name: string, bio: string | null, avatar: FileData | null): Promise<Group>
  getGroup(groupId: number): Promise<Group>
  getGroupByPublicKey(publicKey: web3.PublicKey): Promise<Group | null>
  getUserGroup(publicKey: web3.PublicKey): Promise<Group | null>
  getAllGroups(): Promise<Group[]>
  joinGroup(groupId: number): Promise<void>
  leaveGroup(groupId: number): Promise<void>
  deleteGroup(): Promise<void>

  // POST METHODS
  createPost(groupId: number, text: string | null, image: FileData | null): Promise<Post>
  getPost(publicKey: web3.PublicKey): Promise<Post>
  getAllPosts(groupId: number): Promise<Post[]>
  deletePost(publicKey: web3.PublicKey): Promise<void>
}

export class SocialProtocol implements SplingProtocol {
  private anchorProgram: Program<SocialIDL>
  private shadowDrive: ShdwDrive

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
  getAllPosts = getAllPosts
  deletePost = deletePost

  /**
   *
   * @param connection The web3 connection object.
   * @param wallet - The wallet of the current user.
   */
  /* eslint-disable  @typescript-eslint/no-explicit-any */
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

export { User, Post, Group, Reply, FileData }
export {
  UserNotFoundError,
  GroupNotFoundError,
  PostNotFoundError,
  InvalidHashError,
  StorageAccountNotFoundError,
}

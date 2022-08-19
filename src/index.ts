import { Program, web3 } from '@project-serum/anchor'
import { ShdwDrive } from '@shadow-drive/sdk'
import {
  createPost,
  createGroup,
  createUser,
  getAllPosts,
  getAllGroups,
  joinGroup,
  getPost,
  getGroup,
  getUser,
  followUser,
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
  getUser(userId: string): Promise<User>
  followUser(userId: string): Promise<void>

  // GROUP METHODS
  createGroup(name: string, bio: string | null, avatar: FileData | null): Promise<Group>
  getGroup(groupId: string): Promise<Group>
  getAllGroups(): Promise<Group[]>
  joinGroup(groupId: string): Promise<void>

  // POST METHODS
  createPost(groupId: string, text: string | null, image: FileData | null): Promise<Post>
  getPost(publicKey: web3.PublicKey): Promise<Post>
  getAllPosts(groupId: string): Promise<Post[]>
}

export class SocialProtocol implements SplingProtocol {
  private anchorProgram: Program<SocialIDL>
  private shadowDrive: ShdwDrive

  // USER METHODS
  createUser = createUser
  getUser = getUser
  followUser = followUser

  // GROUP METHODS
  createGroup = createGroup
  getGroup = getGroup
  getAllGroups = getAllGroups
  joinGroup = joinGroup

  // POST METHODS
  createPost = createPost
  getPost = getPost
  getAllPosts = getAllPosts

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

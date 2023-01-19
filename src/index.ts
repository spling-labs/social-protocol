import { Program, Wallet, web3 } from '@project-serum/anchor'
import { ShdwDrive } from 'react-native-shadow-drive'
import {
  createPost,
  createGroup,
  createUser,
  getAllPosts,
  getAllPostsByUserId,
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
import { FileData, Post, PostUser, Reply, Group, User, FileUriData, ProtocolOptions } from './types'
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
import { getOrCreateAssociatedTokenAccount, getAssociatedTokenAddress, createTransferInstruction } from '@solana/spl-token';
import PayerNotFoundError from './utils/errors/PayerNotFoundError'
import { INDEXER_GRAPH_QL_ENDPOINT, SHDW_TOKEN_ADDRESS, SPLING_TOKEN_ADDRESS } from './utils/constants'
import { TOKEN_PROGRAM_ID } from '@project-serum/anchor/dist/cjs/utils/token'
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { GraphQLClient } from 'graphql-request'
import { Order_By } from './gql/graphql'

interface SplingProtocol {
  // USER METHODS
  createUser(
    username: string,
    avatar: FileData | FileUriData | null,
    biography: string,
    metadata: any | null,
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
    metadata: any | null,
  ): Promise<Group>
  getGroup(groupId: number): Promise<Group | null>
  getGroupByPublicKey(publicKey: web3.PublicKey): Promise<Group | null>
  getUserGroup(publicKey: web3.PublicKey): Promise<Group | null>
  getAllGroups(limit: number | null, offset: number | null, orderBy: Order_By | null): Promise<Group[]>
  joinGroup(groupId: number): Promise<void>
  leaveGroup(groupId: number): Promise<void>
  deleteGroup(): Promise<void>

  // POST METHODS
  createPost(
    groupId: number,
    title: string | null,
    text: string | null,
    image: FileData | FileUriData | null,
    tag: string | null,
    metadata: any | null,
  ): Promise<Post>
  getPost(postId: number): Promise<Post | null>
  getPostByPublicKey(publicKey: web3.PublicKey): Promise<Post | null>
  getAllPosts(groupId: number, limit: number | null, offset: number | null, orderBy: Order_By | null): Promise<Post[]>
  getAllPostsByUserId(userId: number, limit: number | null, offset: number | null, orderBy: Order_By | null): Promise<Post[]>
  deletePost(publicKey: web3.PublicKey): Promise<void>
  likePost(publicKey: web3.PublicKey): Promise<void>

  // REPLY METHODS
  createPostReply(postId: number, text: string, metadata: any | null): Promise<Reply>
  getPostReply(publicKey: web3.PublicKey): Promise<Reply | null>
  getAllPostReplies(postId: number): Promise<Reply[]>
  deletePostReply(publicKey: web3.PublicKey): Promise<void>
}

export class SocialProtocol implements SplingProtocol {
  private anchorProgram: Program<SocialIDL>
  private shadowDrive: ShdwDrive
  private connection: web3.Connection
  private wallet: any
  private payer: Wallet | null = null
  private tokenAccount: web3.PublicKey | null = null
  private graphQLClient: GraphQLClient | null = null

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
  getAllPostsByUserId = getAllPostsByUserId
  deletePost = deletePost
  likePost = likePost

  // REPLY METHODS
  createPostReply = createPostReply
  getPostReply = getPostReply
  getAllPostReplies = getAllPostReplies
  deletePostReply = deletePostReply

  /**
   * Constructor for Protocol class.
   * 
   * @param {any} wallet - The wallet (useWallet() function from solana wallet-adapter) or keypair of the user.
   * @param {web3.Keypair | null} - The wallet or keypair of the hot wallet (optional).
   * @param {ProtocolOptions | null} [options=null] - Options for the Protocol instance (optional).
   */
  constructor(wallet: any, payer: web3.Keypair | null = null, options: ProtocolOptions | null) {
    if (options.useIndexer === true) {
      this.graphQLClient = new GraphQLClient(INDEXER_GRAPH_QL_ENDPOINT)
    }
    this.connection = new web3.Connection(options.rpcUrl ? options.rpcUrl : 'https://api.mainnet-beta.solana.com/', 'confirmed')
    this.wallet = wallet instanceof web3.Keypair ? new AnchorWallet(wallet) : wallet
    this.payer = payer ? new AnchorWallet(payer) : null
    this.anchorProgram = createSocialProtocolProgram(this.connection, this.wallet)
  }

  public async init(): Promise<SocialProtocol> {
    if (!this.wallet && !this.wallet.publicKey) return
    this.shadowDrive = await new ShdwDrive(this.connection, this.wallet).init()
    return this
  }

  public async prepareWallet(): Promise<void> {
    if (this.payer === null) return Promise.reject(new PayerNotFoundError())

    // Get token accounts.
    const [shdwTokenAccount, splingTokenAccount] = await Promise.all([
      getOrCreateAssociatedTokenAccount(this.connection, this.payer.payer, SHDW_TOKEN_ADDRESS, this.wallet.publicKey),
      getOrCreateAssociatedTokenAccount(this.connection, this.payer.payer, SPLING_TOKEN_ADDRESS, this.wallet.publicKey)
    ]);

    // Set spling token account address.
    this.tokenAccount = splingTokenAccount.address

    // Get token balances.
    const [solBalance, shdwBalance, splingBalance] = await Promise.all([
      this.connection.getBalance(this.wallet.publicKey),
      this.connection.getTokenAccountBalance(shdwTokenAccount.address),
      this.connection.getTokenAccountBalance(splingTokenAccount.address)
    ]);

    if (solBalance >= 500000 && shdwBalance.value.uiAmount !== null && shdwBalance.value.uiAmount >= 0.01 && splingBalance.value.uiAmount! >= 0.05) return Promise.resolve();

    const [payerShdwPublicKey, payerSplingPublicKey] = await Promise.all([
      getAssociatedTokenAddress(SHDW_TOKEN_ADDRESS, this.payer.publicKey),
      getAssociatedTokenAddress(SPLING_TOKEN_ADDRESS, this.payer.publicKey)
    ]);

    const recentBlockhash = await this.connection.getLatestBlockhash();

    // Make transaction ready for sending the balances
    const transaction = new web3.Transaction({
      feePayer: this.payer.publicKey,
      blockhash: recentBlockhash.blockhash,
      lastValidBlockHeight: recentBlockhash.lastValidBlockHeight
    }).add(
      web3.SystemProgram.transfer({
        fromPubkey: this.payer.publicKey,
        toPubkey: this.wallet.publicKey,
        lamports: 7500000
      })
    ).add(createTransferInstruction(
      payerShdwPublicKey,
      shdwTokenAccount.address,
      this.payer.publicKey,
      0.10 * LAMPORTS_PER_SOL,
      [],
      TOKEN_PROGRAM_ID)
    ).add(createTransferInstruction(
      payerSplingPublicKey,
      splingTokenAccount.address,
      this.payer.publicKey,
      1 * LAMPORTS_PER_SOL,
      [],
      TOKEN_PROGRAM_ID)
    );

    await this.connection.sendTransaction(transaction, [this.payer.payer], { skipPreflight: true, preflightCommitment: 'finalized' })

    return Promise.resolve()
  }

  public getConnection(): web3.Connection {
    return this.connection
  }
}

export { User, Post, PostUser, Group, Reply, FileData, FileUriData, ProtocolOptions, Order_By }
export {
  UserNotFoundError,
  GroupNotFoundError,
  PostNotFoundError,
  InvalidHashError,
  StorageAccountNotFoundError,
}

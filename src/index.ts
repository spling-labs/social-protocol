import { Program, web3 } from "@project-serum/anchor";
import { ShdwDrive } from "@shadow-drive/sdk";
import {
  createPost,
  createReply,
  createSpling,
  createUser,
  getAllPosts,
  getAllReplies,
  getAllSplings,
  getAllUsers,
  getPost,
  getReply,
  getSpling,
  getUser,
  sendTip,
  updatePost,
  updateReply,
  updateSpling,
  updateUser,
} from "./methods";
import { Post, Reply, Spling, TipSize, User } from "./types";
import { createSocialProtocolProgram } from "./utils/helpers";
import { SocialProtocol } from "./utils/idl";

export class SplingProtocol {
  private anchorProgram: Program<SocialProtocol>;
  private shadowDrive: ShdwDrive;

  // USER METHODS
  createUser = (user: User) => createUser;
  updateUser = (user: User) => updateUser;
  getUser = (publicKey: web3.PublicKey) => getUser;
  getAllUsers = () => getAllUsers;

  // SPLING METHODS
  createSpling = (spling: Spling) => createSpling;
  updateSpling = (spling: Spling) => updateSpling;
  getSpling = (publicKey: web3.PublicKey) => getSpling;
  getAllSplings = () => getAllSplings;

  // POST METHODS
  createPost = (post: Post) => createPost;
  updatePost = (post: Post) => updatePost;
  getPost = (publicKey: web3.PublicKey) => getPost;
  getAllPosts = () => getAllPosts;

  // REPLY METHODS
  createReply = (reply: Reply) => createReply;
  updateReply = (reply: Reply) => updateReply;
  getReply = (publicKey: web3.PublicKey) => getReply;
  getAllReplies = () => getAllReplies;

  // TIP METHODS
  sendTip = (
    senderPublicKey: web3.PublicKey,
    receiverPublicKey: web3.PublicKey,
    tipSize: TipSize
  ) => sendTip;

  /**
   *
   * @param connection The web3 connection object.
   * @param wallet - The wallet of the current user.
   */
  constructor(private connection: web3.Connection, private wallet: any) {
    this.connection = connection;
    this.wallet = wallet;
    this.anchorProgram = createSocialProtocolProgram(connection, wallet);
  }

  public async init(): Promise<SplingProtocol> {
    if (!this.wallet && !this.wallet.publicKey) return;
    this.shadowDrive = await new ShdwDrive(this.connection, this.wallet).init();
    return this;
  }
}

export { User, TipSize, Post, Spling, Reply };

import { web3 } from "@project-serum/anchor";
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

export class SplingProtocol {
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

  constructor() {}

  public async init(): Promise<SplingProtocol> {
    return this;
  }
}

export { User, TipSize, Post, Spling, Reply };

import { web3 } from "@project-serum/anchor";
import { Post } from "../../types";

/**
 * @category Post
 * @param publicKey - the PublicKey of the post
 */
export default async function getPost(
  publicKey: web3.PublicKey
): Promise<Post> {
  return Promise.resolve({ text: "", image: "" });
}

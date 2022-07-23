import { web3 } from "@project-serum/anchor";
import { Reply } from "../../types";

/**
 * @category Reply
 * @param publicKey - the PublicKey of the reply
 */
export default async function getReply(
  publicKey: web3.PublicKey
): Promise<Reply> {
  return Promise.resolve({ text: "" });
}

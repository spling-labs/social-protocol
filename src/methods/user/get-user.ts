import { web3 } from "@project-serum/anchor";
import { User } from "../../types";

/**
 * @category User
 * @param publicKey - the PublicKey of the user
 */
export default async function getUser(
  publicKey: web3.PublicKey
): Promise<User> {
  return Promise.resolve({ username: "", avatar: "", bio: "", index: 0 });
}

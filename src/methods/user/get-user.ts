import * as anchor from "@project-serum/anchor";
import { web3 } from "@project-serum/anchor";
import { programId, shadowDriveDomain } from "../../utils/constants";
import { User } from "../../types";

/**
 * @category User
 * @param publicKey - The PublicKey of the user.
 */
export default async function getUser(
  publicKey: web3.PublicKey
): Promise<User> {
  try {
    const [ItemPDA, _] = await web3.PublicKey.findProgramAddress(
      [anchor.utils.bytes.utf8.encode("item"), this.publicKey.toBuffer()],
      programId
    );
    const result = await this.anchorProgram.account.item.fetch(ItemPDA);

    // Get user profile json file from the shadow drive.
    const response = await fetch(
      `${shadowDriveDomain}${(result.shdw as web3.PublicKey).toString()}/${
        result.index
      }.json`
    );
    const userProfileJson = await response.json();

    const hex = new Uint8Array(
      Buffer.from(
        Buffer.from(userProfileJson.username!.toString().padEnd(32, "0"))
      )
    );
    const hash = web3.Keypair.fromSeed(hex).publicKey;
    if (hash.toString() == (result.hash as web3.PublicKey).toString()) {
      return Promise.resolve(userProfileJson as User);
    } else {
      throw new Error(
        "On-chain hash does not match with hash in json file on the shadow drive!"
      );
    }
  } catch (error) {
    return Promise.reject(error);
  }
}

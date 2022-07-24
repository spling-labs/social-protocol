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
    return Promise.resolve(userProfileJson as User);
  } catch (error) {
    return Promise.reject(error);
  }
}

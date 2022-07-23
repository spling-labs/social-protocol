import { web3 } from "@project-serum/anchor";
import { TipSize } from "../../types";

/**
 * @category Tip
 * @param senderPublicKey the PublicKey of the user who wants to tip
 * @param receiverPublicKey the PublicKey of the who whill receive the tip
 * @param tipSize the TipSize of the sender
 */
export default async function sendTip(
  senderPublicKey: web3.PublicKey,
  receiverPublicKey: web3.PublicKey,
  tipSize: TipSize
): Promise<void> {
  return Promise.resolve();
}

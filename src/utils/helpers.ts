import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { programId } from "./constants";
import { IDL, SocialProtocol } from "./idl";

/**
 * @param wallet
 * @param connection
 */
export function createSocialProtocolProgram(
  connection: anchor.web3.Connection,
  wallet: anchor.Wallet
): Program<SocialProtocol> {
  const anchorProvider = new anchor.AnchorProvider(connection, wallet, {});
  return new anchor.Program(IDL, programId, anchorProvider);
}

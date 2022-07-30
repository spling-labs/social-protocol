import { Spling } from '../../models/Spling'

/**
 * @category Spling
 */
export default async function getAllSplings(): Promise<Spling[]> {
  const splings = await this.anchorProgram.account.group.all({})
  return splings.map((spling: any) => new Spling(spling.publicKey, spling.account))
}

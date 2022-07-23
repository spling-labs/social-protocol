import { Spling } from "../../types";

/**
 * @category Spling
 * @param spling - the spling that will be created
 */
export default async function createSpling(spling: Spling): Promise<Spling> {
  return Promise.resolve({ name: "", bio: "", avatar: "" });
}

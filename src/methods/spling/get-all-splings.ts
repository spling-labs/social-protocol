import { Spling } from "../../types";

/**
 * @category Spling
 */
export default async function getAllSplings(): Promise<[Spling]> {
  return Promise.resolve([{ name: "", bio: "", avatar: "" }]);
}

import { User } from "../../types";

/**
 * @category User
 */
export default async function getAllUsers(): Promise<[User]> {
  return Promise.resolve([{ username: "", avatar: "", bio: "", index: 0 }]);
}

import { User } from "../../types";

/**
 * @category User
 * @param user - the user that will be created
 */
export default async function createUser(user: User): Promise<User> {
  return Promise.resolve({ username: "", avatar: "", bio: "", index: 0 });
}

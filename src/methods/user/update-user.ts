import { User } from "../../types";

/**
 * @category User
 * @param user - the updated user
 */
export default async function updateUser(user: User): Promise<User> {
  return Promise.resolve({ username: "", avatar: "", bio: "", index: 0 });
}

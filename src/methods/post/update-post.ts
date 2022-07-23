import { Post } from "../../types";

/**
 * @category Post
 * @param post - the updated post
 */
export default async function updatePost(post: Post): Promise<Post> {
  return Promise.resolve({ text: "", image: "" });
}

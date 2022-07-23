import { Post } from "../../types";

/**
 * @category Post
 * @param post - the post that will be created
 */
export default async function createPost(post: Post): Promise<Post> {
  return Promise.resolve({ text: "", image: "" });
}

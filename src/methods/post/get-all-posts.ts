import { Post } from '../../types'

/**
 * @category Post
 */
export default async function getAllPosts(): Promise<[Post]> {
  return Promise.resolve([{ text: '', image: '' }])
}

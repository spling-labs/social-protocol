import { Reply } from '../../types'

/**
 * @category Reply
 */
export default async function getAllReplies(): Promise<[Reply]> {
  return Promise.resolve([{ text: '' }])
}

import { Reply } from '../../types'

/**
 * @category Reply
 * @param reply - the reply that will be created
 */
export default async function createReply(reply: Reply): Promise<Reply> {
  return Promise.resolve({ text: '' })
}

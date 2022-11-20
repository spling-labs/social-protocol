// USER METHODS
import createUser from './user/create-user'
import getUser from './user/get-user'
import getUserByPublicKey from './user/get-user-by-public-key'
import deleteUser from './user/delete-user'
import followUser from './user/follow-user'
import unfollowUser from './user/unfollow-user'

// GROUP METHODS
import createGroup from './group/create-group'
import getGroup from './group/get-group'
import getGroupByPublicKey from './group/get-group-by-public-key'
import getAllGroups from './group/get-all-groups'
import getUserGroup from './group/get-user-group'
import joinGroup from './group/join-group'
import leaveGroup from './group/leave-group'
import deleteGroup from './group/delete-group'

// POST METHODS
import createPost from './post/create-post'
import getPost from './post/get-post'
import getAllPosts from './post/get-all-posts'
import deletePost from './post/delete-post'
import likePost from './post/like-post'

// REPLY METHODS
import createPostReply from './post/reply/create-post-reply'
import getAllPostReplies from './post/reply/get-all-post-replies'
import deletePostReply from './post/reply/delete-post-reply'

export {
  createUser,
  getUser,
  getUserByPublicKey,
  deleteUser,
  followUser,
  unfollowUser,
  createGroup,
  getGroup,
  getGroupByPublicKey,
  getAllGroups,
  getUserGroup,
  joinGroup,
  leaveGroup,
  deleteGroup,
  createPost,
  getPost,
  getAllPosts,
  deletePost,
  likePost,
  createPostReply,
  getAllPostReplies,
  deletePostReply
}

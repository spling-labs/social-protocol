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
import getAllGroups from './group/get-all-groups'
import getUserGroup from './group/get-user-group'
import joinGroup from './group/join-group'
import leaveGroup from './group/leave-group'

// POST METHODS
import createPost from './post/create-post'
import getPost from './post/get-post'
import getAllPosts from './post/get-all-posts'
import deletePost from './post/delete-post'

export {
  createUser,
  getUser,
  getUserByPublicKey,
  deleteUser,
  followUser,
  unfollowUser,
  createGroup,
  getGroup,
  getAllGroups,
  getUserGroup,
  joinGroup,
  leaveGroup,
  createPost,
  getPost,
  getAllPosts,
  deletePost,
}

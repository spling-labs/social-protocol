// USER METHODS
import createUser from './user/create-user'
import getUser from './user/get-user'
import deleteUser from './user/delete-user'
import followUser from './user/follow-user'
import unfollowUser from './user/unfollow-user'

// GROUP METHODS
import createGroup from './group/create-group'
import getGroup from './group/get-group'
import getAllGroups from './group/get-all-groups'
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
  deleteUser,
  followUser,
  unfollowUser,
  createGroup,
  getGroup,
  getAllGroups,
  joinGroup,
  leaveGroup,
  createPost,
  getPost,
  getAllPosts,
  deletePost,
}

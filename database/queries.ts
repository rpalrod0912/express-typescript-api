//1.Users Queries
const getAllUsers = "SELECT * FROM users";
const checkEmail = "SELECT email FROM users WHERE email = $1";
const getUserWithId = "SELECT * FROM users WHERE id = $1";
const insertUsers =
  "INSERT INTO users (username,email,password) VALUES ($1, $2, $3)";
const checkUsername = "SELECT username FROM users WHERE username = $1";
const getUserWithUserName = "SELECT * FROM users WHERE username = $1";
const deleteUserById = "DELETE FROM users WHERE id = $1";
const updateUserById =
  "UPDATE users SET username = $1, email = $2, password = $3 WHERE id = $4";

const getUsernameByIdQuery = "SELECT username FROM users WHERE id= $1";

//2.Posts Queries
const getAllPosts = "SELECT * FROM posts";
const getPostsByUserId = "SELECT * FROM posts WHERE user_id = $1";
const getPostsById = "SELECT * FROM posts WHERE id = $1";
const createPost =
  "INSERT INTO posts (user_id,image,content) VALUES ($1, $2, $3)";
const deletePostById = "DELETE FROM posts WHERE id = $1";

///3.Likes Queries
const givePostLikes =
  "SELECT COUNT(*) AS num_likes FROM likes WHERE post_id = $1;";

const addNewLike = "INSERT INTO likes (user_id, post_id) VALUES ($1, $2);";

//To Know if User has liked a post
const findIfUserHasLiked =
  "SELECT EXISTS(SELECT 1 FROM likes WHERE user_id = $1 AND post_id = $2);";

//To delete like from post
const deleteLike = "DELETE FROM likes WHERE user_id = $1 AND post_id = $2";

///4.Comments Queries
const getPostComments = "SELECT * FROM comments WHERE post_id = $1";
const addPostComment =
  "INSERT INTO comments (user_id, post_id,content) VALUES ($1, $2, $3);";
const findIfUserHasComment =
  "SELECT EXISTS(SELECT 1 FROM comments WHERE user_id = $1 AND post_id = $2);";
const deleteComment =
  "DELETE FROM comments WHERE user_id = $1 AND post_id = $2";

///5.Followers Queries
const getFollowers = "SELECT * FROM followers WHERE following_id = $1";

const getFolloweds = "SELECT * FROM followers WHERE follower_id = $1";

const followUser =
  "INSERT INTO followers (follower_id, following_id) VALUES ($1, $2);";

const checkIfUserIsFollower =
  "SELECT EXISTS(SELECT 1 FROM followers WHERE follower_id = $1 AND following_id = $2);";

const unfollowUser =
  "DELETE FROM followers WHERE follower_id = $1 AND following_id = $2";

//6.Images Queries

const updateUserProfileImage = "UPDATE users SET image = $1 WHERE id = $2";

export {
  getAllUsers,
  checkEmail,
  getPostComments,
  checkUsername,
  createPost,
  getPostsByUserId,
  deleteUserById,
  insertUsers,
  getUserWithId,
  updateUserById,
  getAllPosts,
  deletePostById,
  checkIfUserIsFollower,
  getPostsById,
  givePostLikes,
  addNewLike,
  findIfUserHasLiked,
  deleteLike,
  getUsernameByIdQuery,
  addPostComment,
  getUserWithUserName,
  findIfUserHasComment,
  getFolloweds,
  deleteComment,
  getFollowers,
  followUser,
  unfollowUser,
  updateUserProfileImage,
};

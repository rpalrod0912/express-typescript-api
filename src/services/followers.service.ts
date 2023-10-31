import { pool } from "../../database/db-connection";
import {
  followUser,
  getFollowers,
  checkIfUserIsFollower,
  unfollowUser,
} from "../../database/queries";

const getCommentsFromPost = async (following_id: number) => {
  const response = await pool.query(getFollowers, [following_id]);
  return response.rows;
};

const postFollow = async (follower_id: number, following_id: number) => {
  const response = await pool.query(followUser, [follower_id, following_id]);
  return response;
};

const checkIfUserIsFollowing = async (
  follower_id: number,
  following_id: number
) => {
  const response = await pool.query(checkIfUserIsFollower, [
    follower_id,
    following_id,
  ]);
  return response;
};

const deleteFollow = async (follower_id: number, following_id: number) => {
  const response = await pool.query(unfollowUser, [follower_id, following_id]);
  return response;
};

export {
  getCommentsFromPost,
  checkIfUserIsFollowing,
  postFollow,
  deleteFollow,
};

import { pool } from "../../database/db-connection";
import {
  followUser,
  getFollowers,
  checkIfUserIsFollower,
  unfollowUser,
  getFolloweds,
} from "../../database/queries";

const getUserFollowers = async (following_id: number) => {
  const response = await pool.query(getFollowers, [following_id]);
  return response.rows;
};

const getUserFolloweds = async (followed_id: number) => {
  const response = await pool.query(getFolloweds, [followed_id]);
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
  getUserFollowers,
  getUserFolloweds,
  checkIfUserIsFollowing,
  postFollow,
  deleteFollow,
};

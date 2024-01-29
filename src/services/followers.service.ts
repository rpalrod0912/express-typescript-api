import { pool } from "../../database/db-connection";
import {
  followUser,
  getFollowers,
  checkIfUserIsFollower,
  unfollowUser,
  getFolloweds,
} from "../../database/queries";
import { getUserProfileImage } from "./images.service";
import { getUserById, getUsernameById } from "./user.service";

const getUserFollowers = async (following_id: number) => {
  const response = await pool.query(getFollowers, [following_id]);
  return response.rows;
};

const getUserFolloweds = async (followed_id: number) => {
  const response = await pool.query(getFolloweds, [followed_id]);
  return response.rows;
};

const getUserFollowersDetailed = async (following_id: number) => {
  const response = await pool.query(getFollowers, [following_id]);
  const userFollowers = response.rows;
  for (let index = 0; index < userFollowers.length; index++) {
    const getUserData =
      (await getUserById(userFollowers[index].follower_id))[0] ?? "";
    userFollowers[index].image =
      (await getUserProfileImage(getUserData.image)) ?? "";
    userFollowers[index].user_name =
      (await getUsernameById(userFollowers[index].follower_id))[0].username ??
      "";
  }
  return userFollowers;
};

const getUserFollowedsDetailed = async (followed_id: number) => {
  const response = await pool.query(getFolloweds, [followed_id]);
  const userFolloweds = response.rows;
  for (let index = 0; index < userFolloweds.length; index++) {
    const getUserData =
      (await getUserById(userFolloweds[index].following_id))[0] ?? "";
    userFolloweds[index].image =
      (await getUserProfileImage(getUserData.image)) ?? "";
    userFolloweds[index].user_name =
      (await getUsernameById(userFolloweds[index].following_id))[0].username ??
      "";
  }
  return userFolloweds;
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
  getUserFollowedsDetailed,
  getUserFollowersDetailed,
};

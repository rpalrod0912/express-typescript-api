import { pool } from "../../database/db-connection";
import {
  addNewLike,
  givePostLikes,
  findIfUserHasLiked,
  deleteLike,
} from "../../database/queries";

const getPostLikes = async (post_id: number) => {
  const response = await pool.query(givePostLikes, [post_id]);
  return response.rows[0];
};

const likePost = async (user_id: number, post_id: number) => {
  const response = await pool.query(addNewLike, [user_id, post_id]);
  return response;
};

const userHasLiked = async (user_id: number, post_id: number) => {
  const response = await pool.query(findIfUserHasLiked, [user_id, post_id]);
  return response;
};

const deleteUserLike = async (user_id: number, post_id: number) => {
  const response = await pool.query(deleteLike, [user_id, post_id]);
  return response;
};

export { getPostLikes, likePost, userHasLiked, deleteUserLike };

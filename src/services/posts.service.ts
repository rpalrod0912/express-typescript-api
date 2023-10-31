import { pool } from "../../database/db-connection";
import {
  getAllPosts,
  getPostsByUserId,
  createPost,
  deletePostById,
  getPostsById,
} from "../../database/queries";
import { User } from "../interfaces/user.interface";

const getPosts = async (): Promise<User> => {
  const response = await pool.query(getAllPosts);
  return response.rows;
};

const getUserPosts = async (user_id: number) => {
  const response = await pool.query(getPostsByUserId, [user_id]);
  return response.rows;
};

const getPostByPostId = async (id: number) => {
  const response = await pool.query(getPostsById, [id]);
  return response.rows;
};

const addNewPost = async (user_id: string, image: string, content: string) => {
  debugger;
  const response = await pool.query(createPost, [user_id, image, content]);
  return response;
};

const deletePost = async (id: number) => {
  debugger;
  const response = await pool.query(deletePostById, [id]);
  return response;
};

export { getPosts, getUserPosts, addNewPost, getPostByPostId, deletePost };

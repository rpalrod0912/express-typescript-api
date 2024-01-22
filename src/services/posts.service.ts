import { pool } from "../../database/db-connection";
import {
  getAllPosts,
  getPostsByUserId,
  createPost,
  deletePostById,
  getPostsById,
} from "../../database/queries";
import { Posts } from "../interfaces/posts.interface";
import { User } from "../interfaces/user.interface";
import { getPostImage } from "./images.service";

const getPosts = async (): Promise<User> => {
  const response = await pool.query(getAllPosts);
  if (response.rows) {
    response.rows.forEach(async (post: Posts, index: number) => {
      response.rows[index].image = (await getPostImage(post)) ?? "";
    });
  }
  return response.rows;
};

const getUserPosts = async (user_id: number): Promise<Posts[]> => {
  const response = await pool.query(getPostsByUserId, [user_id]);
  if (response.rows) {
    response.rows.forEach(async (post: Posts, index: number) => {
      response.rows[index].image = (await getPostImage(post)) ?? "";
    });
  }
  return response.rows;
};

const getPostByPostId = async (id: number): Promise<Posts> => {
  const response = await pool.query(getPostsById, [id]);
  if (response.rows[0]) {
    response.rows[0].image = (await getPostImage(response.rows[0])) ?? "";
  }

  return response.rows[0];
};

const addNewPost = async (user_id: string, image: string, content: string) => {
  const response = await pool.query(createPost, [user_id, image, content]);
  return response;
};

const deletePost = async (id: number) => {
  const response = await pool.query(deletePostById, [id]);
  return response;
};

export { getPosts, getUserPosts, addNewPost, getPostByPostId, deletePost };

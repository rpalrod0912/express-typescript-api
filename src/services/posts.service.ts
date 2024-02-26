import { pool } from "../../database/db-connection";
import {
  getAllPosts,
  getPostsByUserId,
  getAllPostsPaginated,
  createPost,
  deletePostById,
  getPostsById,
} from "../../database/queries";
import { Posts } from "../interfaces/posts.interface";
import { User } from "../interfaces/user.interface";
import { getCommentsFromPost } from "./comments.service";
import { getPostImage } from "./images.service";
import { getUserById } from "./user.service";

const getPosts = async (): Promise<User> => {
  const response = await pool.query(getAllPosts);
  const allPosts = response.rows;
  if (allPosts) {
    for (let index = 0; index < allPosts.length; index++) {
      const post: Posts = allPosts[index];
      allPosts[index].image = (await getPostImage(post)) ?? "";
      allPosts[index].user_data = (await getUserById(post.user_id))[0] ?? "";
      allPosts[index].comments = (await getCommentsFromPost(post.id)) ?? "";
      allPosts[index].user_name = allPosts[index].user_data.username;
    }
  }
  return allPosts;
};

const getPostsPaginated = async (
  limit: number,
  offset: number
): Promise<User> => {
  const response = await pool.query(getAllPostsPaginated, [offset, limit]);
  const allPosts = response.rows;
  console.log(allPosts.length);

  if (allPosts) {
    for (let index = 0; index < allPosts.length; index++) {
      const post: Posts = allPosts[index];
      allPosts[index].image = (await getPostImage(post)) ?? "";
      allPosts[index].user_data = (await getUserById(post.user_id))[0] ?? "";
      allPosts[index].comments = (await getCommentsFromPost(post.id)) ?? "";
      allPosts[index].user_name = allPosts[index].user_data.username;
    }
  }
  return allPosts;
};

const getUserPosts = async (user: User): Promise<Posts[]> => {
  const response = await pool.query(getPostsByUserId, [user.id]);
  const userPosts = response.rows;

  if (userPosts) {
    for (let index = 0; index < userPosts.length; index++) {
      const post: Posts = userPosts[index];
      userPosts[index].image = (await getPostImage(post)) ?? "";
      userPosts[index].user_name = user.username;
      userPosts[index].comments = (await getCommentsFromPost(post.id)) ?? "";
      console.log(userPosts[index].comments);
    }
  }
  return userPosts;
};

const getPostByPostId = async (id: number): Promise<Posts> => {
  const response = await pool.query(getPostsById, [id]);
  const post = response.rows[0];
  if (post) {
    post.image = (await getPostImage(post)) ?? "";
    post.user_name = (await getUserById(post.user_id))[0] ?? "";
    post.comments = await getCommentsFromPost(post.id);
  }
  return post;
};

const addNewPost = async (user_id: string, image: string, content: string) => {
  const response = await pool.query(createPost, [user_id, image, content]);
  return response;
};

const deletePost = async (id: number) => {
  const response = await pool.query(deletePostById, [id]);
  return response;
};

export {
  getPosts,
  getUserPosts,
  getPostsPaginated,
  addNewPost,
  getPostByPostId,
  deletePost,
};

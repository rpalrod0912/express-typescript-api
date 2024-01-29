import { pool } from "../../database/db-connection";
import {
  addPostComment,
  deleteComment,
  findIfUserHasComment,
  getPostComments,
} from "../../database/queries";
import { CommentInterface } from "../interfaces/comment.interface";
import { User } from "../interfaces/user.interface";
import { getUserProfileImage } from "./images.service";
import { getUserById } from "./user.service";

const getCommentsFromPost = async (post_id: number) => {
  const response = await pool.query(getPostComments, [post_id]);
  for (let index = 0; index < response.rows.length; index++) {
    const comment: CommentInterface = response.rows[index];
    const getUserData: User = (await getUserById(comment.user_id))[0];
    response.rows[index].user_image = await getUserProfileImage(
      getUserData.image.toString()
    );
    response.rows[index].user_name = getUserData.username;
  }
  return response.rows;
};

const addCommentsToPost = async (
  user_id: number,
  post_id: number,
  content: string
) => {
  const response = await pool.query(addPostComment, [
    user_id,
    post_id,
    content,
  ]);
  return response;
};

const userHasCommented = async (user_id: number, post_id: number) => {
  const response = await pool.query(findIfUserHasComment, [user_id, post_id]);
  return response;
};

const deleteUserComment = async (user_id: number, post_id: number) => {
  const response = await pool.query(deleteComment, [user_id, post_id]);
  return response;
};

export {
  getCommentsFromPost,
  addCommentsToPost,
  userHasCommented,
  deleteUserComment,
};

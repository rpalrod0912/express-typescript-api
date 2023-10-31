import { pool } from "../../database/db-connection";
import {
  addPostComment,
  deleteComment,
  findIfUserHasComment,
  getPostComments,
} from "../../database/queries";

const getCommentsFromPost = async (post_id: number) => {
  const response = await pool.query(getPostComments, [post_id]);
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

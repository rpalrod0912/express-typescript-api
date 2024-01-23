import * as commentsService from "../services/comments.service";
import * as userService from "../services/user.service";

//In Json Request Body
/*
  {
        "id": 1,
        "user_id": 1,
        "post_id": 1,
        "content": "This is a comment on the first post!",
        "created_at": "2024-01-19T14:01:38.511Z",
        "updated_at": "2024-01-19T14:01:38.511Z"
    }
 */
const getCommentsFromPost = async (req: any, res: any) => {
  const post_id = parseInt(req.body.post_id);
  const response = await commentsService.getCommentsFromPost(post_id);
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(400).send("Something went wrong");
  }
};

const addCommentsToPost = async (req: any, res: any) => {
  const { user_id, post_id, content } = req.body;
  const findUser = await userService.getUserById(user_id);
  const findIfUserHasCommented = await commentsService.userHasCommented(
    user_id,
    post_id
  );
  const response =
    findUser.length > 0 && !findIfUserHasCommented.rows[0].exists && content
      ? await commentsService.addCommentsToPost(user_id, post_id, content)
      : null;
  if (response) {
    res.status(200).json("Comment added");
  } else if (findUser.length === 0) {
    res.status(400).json("No user exists with that id");
  } else if (!content) {
    res.status(400).json("Please add content to the comment");
  } else if (findIfUserHasCommented.rows[0].exists) {
    res.status(400).json("User Already commented the post");
  } else {
    res.status(400).send("Something went wrong");
  }
};

const deleteUserComment = async (req: any, res: any) => {
  const { user_id, post_id } = req.body;
  const findUser = await userService.getUserById(user_id);
  const findIfUserHasLiked = await commentsService.userHasCommented(
    user_id,
    post_id
  );

  const response =
    findUser.length > 0 && findIfUserHasLiked.rows[0].exists
      ? await commentsService.deleteUserComment(user_id, post_id)
      : null;
  if (response) {
    res.status(200).json(response);
  } else if (findUser.length === 0) {
    res.status(400).json("No user exists with that id");
  } else if (!findIfUserHasLiked.rows[0].exists) {
    res.status(400).json("User didn't commented the post");
  } else {
    res.status(400).send("Something went wrong");
  }
};

const userHasCommented = async (req: any, res: any) => {
  const { user_id, post_id } = req.body;
  const response = await commentsService.userHasCommented(user_id, post_id);
  if (response.rows[0].exists) {
    res.status(200).json({
      commented: true,
    });
  } else if (!response.rows[0].exists) {
    res.status(200).json({
      commented: false,
    });
  } else {
    res.status(400).send("Something went wrong");
  }
};
export {
  getCommentsFromPost,
  addCommentsToPost,
  deleteUserComment,
  userHasCommented,
};

import * as likesService from "../services/likes.service";
import * as userService from "../services/user.service";

const getPostLikes = async (req: any, res: any) => {
  debugger;

  const post_id = parseInt(req.body.post_id);
  const response = await likesService.getPostLikes(post_id);
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(400).send("Something went wrong");
  }
};

const likePost = async (req: any, res: any) => {
  const { user_id, post_id } = req.body;
  const findUser = await userService.getUserById(user_id);
  const findIfUserHasLiked = await likesService.userHasLiked(user_id, post_id);
  debugger;
  console.log(findIfUserHasLiked.rows);
  const response =
    findUser.length > 0 && !findIfUserHasLiked.rows[0].exists
      ? await likesService.likePost(user_id, post_id)
      : null;
  if (response) {
    res.status(200).json("Like added");
  } else if (findUser.length === 0) {
    res.status(400).json("No user exists with that id");
  } else if (findIfUserHasLiked.rows[0].exists) {
    res.status(400).json("User Already liked the post");
  } else {
    res.status(400).send("Something went wrong");
  }
};

const deleteUserLike = async (req: any, res: any) => {
  const { user_id, post_id } = req.body;
  const findUser = await userService.getUserById(user_id);
  const findIfUserHasLiked = await likesService.userHasLiked(user_id, post_id);
  debugger;
  console.log(findIfUserHasLiked.rows);
  const response =
    findUser.length > 0 && findIfUserHasLiked.rows[0].exists
      ? await likesService.deleteUserLike(user_id, post_id)
      : null;
  if (response) {
    res.status(200).json(response);
  } else if (findUser.length === 0) {
    res.status(400).json("No user exists with that id");
  } else if (!findIfUserHasLiked.rows[0].exists) {
    res.status(400).json("User didn't liked the post");
  } else {
    res.status(400).send("Something went wrong");
  }
};

const hasUserLikedPost = async (req: any, res: any) => {
  const { user_id, post_id } = req.body;
  const response = await likesService.userHasLiked(user_id, post_id);
  if (response.rows[0].exists) {
    res.status(200).json({
      liked: true,
    });
  } else if (!response.rows[0].exists) {
    res.status(200).json({
      liked: false,
    });
  } else {
    res.status(400).send("Something went wrong");
  }
};
export { getPostLikes, likePost, deleteUserLike, hasUserLikedPost };

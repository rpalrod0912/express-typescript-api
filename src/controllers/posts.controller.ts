import * as postsService from "../services/posts.service";
import * as userService from "../services/user.service";
import * as likesService from "../services/likes.service";

const path = require("path");

const getPosts = async (req: any, res: any) => {
  const response = await postsService.getPosts();
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(400).send("Something went wrong");
  }
};

const getPostsPaginated = async (req: any, res: any) => {
  if (req.query.page && req.query.limit) {
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to limit of 10 if not provided
    const offset = (page - 1) * limit;
    const response = await postsService.getPostsPaginated(limit, offset);

    if (response) {
      res.status(200).json(response);
    } else {
      res.status(400).send("Something went wrong");
    }
  } else {
    res.status(400).send("Please send correct limit and page params");
  }
};

const getUserPosts = async (req: any, res: any) => {
  const user_id = parseInt(req.params.id);
  const userData = (await userService.getUserById(user_id))[0];
  const response = await postsService.getUserPosts(userData);
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(400).send("Something went wrong");
  }
};

const getPostByPostId = async (req: any, res: any) => {
  const postId = parseInt(req.params.id);
  const postLikes = await likesService.getPostLikes(postId);
  console.log(postLikes);
  const response = await postsService.getPostByPostId(postId);

  if (response) {
    res.status(200).json({ ...response, likes: postLikes.num_likes });
  } else if (response) {
    res.status(400).json("No posts exists with that id");
  } else {
    res.status(400).send("Something went wrong");
  }
};

//Make Post With Image
const addNewPost = async (req: any, res: any) => {
  const { user_id, content } = req.body;
  const filePath = path.join(__dirname, "../../uploads");
  if (user_id && filePath && content && req.file) {
    const findUser = await userService.getUserById(user_id);
    const response =
      findUser.length > 0
        ? await postsService.addNewPost(user_id, req.file.filename, content)
        : null;
    if (response) {
      res.status(200).json(response);
    } else if (findUser) {
      res.status(400).json("No user exists with that id");
    } else {
      res.status(400).send("Something went wrong");
    }
  } else {
    res.status(400).send("Incorrect Post Data Provided");
  }
};

const deletePost = async (req: any, res: any) => {
  const id = parseInt(req.params.id);
  if (id) {
    const findPost = await postsService.getPostByPostId(id);
    console.log(findPost);
    const response = findPost ? await postsService.deletePost(id) : null;
    if (response) {
      res.status(200).json(`Post With Id ${id} deleted successfully`);
    } else if (!findPost) {
      res.status(400).json("No post exists with that id");
    } else {
      res.status(400).send("Something went wrong");
    }
  } else {
    res.status(400).send("Error, Please provida a correct post Id");
  }
};

export {
  getPosts,
  getUserPosts,
  getPostsPaginated,
  addNewPost,
  getPostByPostId,
  deletePost,
};

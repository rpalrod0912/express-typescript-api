import * as followersService from "../services/followers.service";
import * as userService from "../services/user.service";

// Example Call Endpoint :
//localhost:3000/api/followers?user=3

const getFollowers = async (req: any, res: any) => {
  const { user } = req.query;
  const followers = await followersService.getUserFollowers(parseInt(user));
  const followeds = await followersService.getUserFolloweds(parseInt(user));
  if (followers && followeds) {
    res
      .status(200)
      .json({ followers: followers.length, followeds: followeds.length });
  } else {
    res.status(400).send("Something went wrong");
  }
};

const checkIfUserIsFollowing = async (req: any, res: any) => {
  const { follower_id, following_id } = req.body;
  const response = await followersService.checkIfUserIsFollowing(
    follower_id,
    following_id
  );
  if (response.rows[0].exists) {
    res.status(200).json({
      followed: true,
    });
  } else if (!response.rows[0].exists) {
    res.status(200).json({
      followed: false,
    });
  } else {
    res.status(400).send("Something went wrong");
  }
};

//Post Method to follow User
/*{
  "following_id":3, -->User to ad follow
  "follower_id":1 -->User to ad followed
  
}
*/
const postFollow = async (req: any, res: any) => {
  const { follower_id, following_id } = req.body;

  const findFollower = await userService.getUserById(follower_id);
  const findFollowing = await userService.getUserById(following_id);
  const findIfAlreadyFollowing = await followersService.checkIfUserIsFollowing(
    follower_id,
    following_id
  );

  const response =
    findFollower.length > 0 &&
    findFollowing.length > 0 &&
    !findIfAlreadyFollowing.rows[0].exists
      ? await followersService.postFollow(follower_id, following_id)
      : null;
  if (response) {
    res.status(200).json("User Followed");
  } else if (findFollower.length === 0 && findFollowing.length === 0) {
    res.status(400).json("No user exists with that id");
  } else if (findIfAlreadyFollowing.rows[0].exists) {
    res.status(400).json("User Already followed");
  } else {
    res.status(400).send("Something went wrong");
  }
};

const deleteFollow = async (req: any, res: any) => {
  const { follower_id, following_id } = req.body;
  const findFollower = await userService.getUserById(follower_id);
  const findFollowing = await userService.getUserById(following_id);
  const findIfAlreadyFollowing = await followersService.checkIfUserIsFollowing(
    follower_id,
    following_id
  );

  const response =
    findFollower.length > 0 &&
    findFollowing.length > 0 &&
    findIfAlreadyFollowing.rows[0].exists
      ? await followersService.deleteFollow(follower_id, following_id)
      : null;
  if (response) {
    res.status(200).json("User Followed");
  } else if (findFollower.length === 0 && findFollowing.length === 0) {
    res.status(400).json("No user exists with that id");
  } else if (!findIfAlreadyFollowing.rows[0].exists) {
    res.status(400).json("Error, User Not Followed");
  } else {
    res.status(400).send("Something went wrong");
  }
};

export { getFollowers, checkIfUserIsFollowing, postFollow, deleteFollow };

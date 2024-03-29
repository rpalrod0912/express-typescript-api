import { User } from "../interfaces/user.interface";
import * as imagesService from "../services/images.service";
import * as userService from "../services/user.service";

const getUserProfileImage = async (req: any, res: any) => {
  const userData: User =
    (await userService.getUserById(req.params.userId))[0] ?? null;
  const response =
    userData && userData.image
      ? await imagesService.getUserProfileImage(userData.image.toString())
      : null;
  if (userData) {
    return response
      ? res.status(200).json({ image: response })
      : res.status(204).send("User Doesn't Have Image");
  } else {
    res.status(400).send("User Doesn't exists");
  }
};

export { getUserProfileImage };

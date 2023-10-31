//DB Connection parameters
// import { pool } from "../../database/db-connection";
// import { checkEmail, insertUsers } from "../../database/queries";
// If you want to import a service with dunction import * as 'giveName'
import * as userService from "../services/user.service";

const getUsers = async (req: any, res: any) => {
  debugger;

  const response = await userService.getUsers();
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(400).send("Something went wrong");
  }
};

const createUser = async (req: any, res: any) => {
  debugger;
  console.log("hola");

  const { username, email, password } = req.body;
  console.log(username, email, password);
  if (username && email && password) {
    //check if email exist
    const emailCoincidences = await userService.checkEmailExists(email);
    const usernameCoincidences = await userService.checkUserNameExists(
      username
    );

    if (emailCoincidences.length === 0 && usernameCoincidences.length === 0) {
      await userService.createUser(username, email, password);
      res.status(200).json({
        username,
        email,
        password,
      });
      return;
    } else if (emailCoincidences.length > 0) {
      console.log(emailCoincidences);
      res.status(400).json("Email already used");
      return;
    } else if (usernameCoincidences.length > 0) {
      console.log(emailCoincidences);
      res.status(400).json("Username already used");
    }
  } else {
    res.status(400).json("No user data provided");
  }
};

export { createUser, getUsers };

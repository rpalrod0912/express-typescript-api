//DB Connection parameters
import * as userService from "../services/user.service";

const getUsers = async (req: any, res: any) => {
  debugger;

  const response = await userService.getUsers();
  if (response) {
    res.status(200).json(response);
  } else {
    res.status(200).send("Something went wrong");
  }
};

const createUser = async (req: any, res: any) => {
  debugger;
  console.log("hola");

  const { username, email, password } = req.body;
  console.log(username, email, password);
  if (username && email && password) {
    //check if email exist
    const emailExiste = await userService.createUser(username, email, password);
    console.log(emailExiste);

    // switch (emailExiste) {
    //   case "201":
    //     res.status(201).json({
    //       message: "User Added Succesfully",
    //       body: {
    //         user: { username, email, password },
    //       },
    //     });
    //     break;
    //   case "500":
    //     res.status(500).send("ERROR");
    //     break;
    //   case "400":
    //     res.status(400).json("Email already exists");
    //     break;
    //   default:
    //     break;
    // }
  } else {
    res.status(400).json("No user data provided");
  }
};

export { createUser, getUsers };

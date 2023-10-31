//DB Connection parameters
import { pool } from "../../database/db-connection";
import { checkEmail, insertUsers } from "../../database/queries";
// If you want to import a service with dunction import * as 'giveName'
// import * as userService from "../services/user.service";

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

    await pool.query(
      checkEmail,
      [email],
      async (error: any, results: { rows: string | any[] }) => {
        debugger;
        if (error) return res.status(500).send("ERROR");
        if (results.rows.length) {
          return res.status(400).json("Email already exists");
        }
        //if email isn't being used register the user
        await pool.query(
          insertUsers,
          [username, email, password],
          (error: any, results: any) => {
            if (error) {
              console.log(error);
              return res.status(500).send("ERROR");
            }

            return res.status(201).json({
              message: "User Added Succesfully",
              body: {
                user: { username, email, password },
              },
            });
          }
        );
      }
    );
  } else {
    res.status(400).json("No user data provided");
  }
};

export { createUser, getUsers };

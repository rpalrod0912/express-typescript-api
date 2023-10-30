import { pool } from "../../database/db-connection";
import { checkEmail, insertUsers } from "../../database/queries";

const getUsers = async () => {
  const response = await pool.query("SELECT * FROM users");
  return response;
};

const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  await pool.query(
    checkEmail,
    [email],
    (error: any, results: { rows: string | any[] }) => {
      debugger;
      if (error) return "500"; //res.status(500).send("ERROR");
      if (results.rows.length) {
        //res.status(400).json("Email already exists");
        return "400";
      }

      //if email isn't being used register the user
      pool.query(
        insertUsers,
        [username, email, password],
        (error: any, results: any) => {
          if (error) return "500"; //res.status(500).send("ERROR");
          return "201";
          // res.status(201).json({
          //   message: "User Added Succesfully",
          //   body: {
          //     user: { username, email, password },
          //   },
          // });
        }
      );
    }
  );
};

export { createUser, getUsers };

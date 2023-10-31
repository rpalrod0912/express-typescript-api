import { pool } from "../../database/db-connection";
import {
  checkEmail,
  getAllUsers,
  checkUsername,
  insertUsers,
} from "../../database/queries";
import { User } from "../interfaces/user.interface";

const getUsers = async (): Promise<User> => {
  const response = await pool.query(getAllUsers);
  console.log(response.rows);
  return response.rows;
};

const checkEmailExists = async (email: string) => {
  const response = await pool.query(checkEmail, [email]);
  return response.rows;
};

const checkUserNameExists = async (username: string) => {
  const response = await pool.query(checkUsername, [username]);
  return response.rows;
};

const createUser = async (
  username: string,
  email: string,
  password: string
) => {
  const response = await pool.query(insertUsers, [username, email, password]);
  return response;
};

export { getUsers, checkUserNameExists, createUser, checkEmailExists };

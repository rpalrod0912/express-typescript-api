import { pool } from "../../database/db-connection";
import {
  checkEmail,
  getAllUsers,
  checkUsername,
  getUserWithId,
  deleteUserById,
  updateUserById,
  insertUsers,
} from "../../database/queries";
import { User } from "../interfaces/user.interface";

const getUsers = async (): Promise<User> => {
  const response = await pool.query(getAllUsers);
  console.log(response.rows);
  return response.rows;
};

const getUserById = async (id: number) => {
  const response = await pool.query(getUserWithId, [id]);
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

const removeUser = async (id: number) => {
  const userExists = await getUserById(id);
  if (userExists) {
    const response = await pool.query(deleteUserById, [id]);
    return response.rowCount;
  }
  return 0;
};

const updateUser = async (
  username: string,
  email: string,
  password: string,
  id: number
) => {
  const userExists = await getUserById(id);
  if (userExists) {
    const originalUserData: User = userExists[0];
    const newUserData: User = {
      ...originalUserData,
      username: !username ? originalUserData.username : username,
      email: !email ? originalUserData.email : email,
      password: !password ? originalUserData.password : password,
    };
    const response = await pool.query(updateUserById, [
      newUserData.username,
      newUserData.email,
      newUserData.password,
      id,
    ]);
    console.log(response.rowCount);
    return response.rowCount;
  }
  return 0;
};

export {
  getUsers,
  checkUserNameExists,
  createUser,
  checkEmailExists,
  getUserById,
  removeUser,
  updateUser,
};

import { pool } from "../../database/db-connection";
import {
  checkEmail,
  getAllUsers,
  checkUsername,
  getUserWithId,
  deleteUserById,
  updateUserById,
  getUserWithUserName,
  insertUsers,
  getUsernameByIdQuery,
  updateUserProfileImage,
} from "../../database/queries";
import { User } from "../interfaces/user.interface";
const bcrypt = require("bcrypt");
const saltRounds = 10;

const getUsers = async (): Promise<User> => {
  const response = await pool.query(getAllUsers);
  console.log(response.rows);
  return response.rows;
};

const getUserById = async (id: number): Promise<User[]> => {
  const response = await pool.query(getUserWithId, [id]);
  return response.rows;
};

const getUsernameById = async (id: number): Promise<User[]> => {
  const response = await pool.query(getUsernameByIdQuery, [id]);
  console.log(response);
  return response.rows;
};

const getUserByUsername = async (username: string) => {
  const response = await pool.query(getUserWithUserName, [username]);
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
  const hashPassword = await bcrypt
    .hash(password, saltRounds)
    .then((hash: any) => {
      return hash;
    })
    .catch((err: any) => console.error(err.message));

  const response = await pool.query(insertUsers, [
    username,
    email,
    hashPassword,
  ]);
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

const updateUserImage = async (userId: string, file: string) => {
  const response = await pool.query(updateUserProfileImage, [file, userId]);
  return response;
};

export async function validateUser(password: any, hash: any) {
  return await bcrypt
    .compare(password, hash)
    .then((res: boolean) => {
      return res;
    })
    .catch((err: any) => console.error(err.message));
}

export {
  getUsers,
  checkUserNameExists,
  createUser,
  checkEmailExists,
  getUserById,
  removeUser,
  getUsernameById,
  updateUser,
  getUserByUsername,
  updateUserImage,
};

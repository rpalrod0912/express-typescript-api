const getAllUsers = "SELECT * FROM users";
const checkEmail = "SELECT email FROM users WHERE email = $1";
const insertUsers =
  "INSERT INTO users (username,email,password) VALUES ($1, $2, $3)";
const checkUsername = "SELECT username FROM users WHERE username = $1";
//   [name, email]

export { getAllUsers, checkEmail, checkUsername, insertUsers };

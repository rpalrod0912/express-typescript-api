const checkEmail = "SELECT email FROM users WHERE email = $1";
const insertUsers =
  "INSERT INTO users (username,email,password) VALUES ($1, $2, $3)";
//   [name, email]

export { checkEmail, insertUsers };

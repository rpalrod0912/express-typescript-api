const { Pool } = require("pg");

export const pool = new Pool({
  // host: "localhost",
  //Production Host:
  host: "dpg-cnedarol6cac73dj04b0-a",
  // user: "postgres",
  //Porduction user
  user: "postgresnodeapi",
  // password: "postgres",
  //Production Password
  password: "htcxTey9dIJ3TqrRsJVh5qngyvYGOIws",
  // database: "nodeapi",
  //Production database:
  database: "nodeapi_tf9r",
  port: "5432",
});

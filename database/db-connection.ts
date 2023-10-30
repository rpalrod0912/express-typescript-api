const { Pool } = require("pg");

export const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "nodeapi",
  port: "5432",
});

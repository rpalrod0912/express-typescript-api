const { Pool } = require("pg");

// export const pool = new Pool({
//   host: "localhost",
//   user: "postgres",
//   password: "postgres",
//   database: "nodeapi",
// });

//production connection to render DATABASE IMPORTANT URL HAVE TO BE COMPLETE OF HOST IF NO IT FAILS

export const pool = new Pool({
  host: "dpg-cnedarol6cac73dj04b0-a.frankfurt-postgres.render.com",

  user: "postgresnodeapi",
  ssl: true,

  password: "htcxTey9dIJ3TqrRsJVh5qngyvYGOIws",

  database: "nodeapi_tf9r",
  port: "5432",
});

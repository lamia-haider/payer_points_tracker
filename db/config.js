const Pool = require("pg").Pool;
const DATABASE_URL =
  "postgres://ucyilmmkgiemkl:74d45e02cb0f1ccb1bedd6be09b4a3e13851a15002e07083f6e2a0ae1b05eaa0@ec2-3-216-113-109.compute-1.amazonaws.com:5432/d6t93vmk3buv4c";
const pool = new Pool({
  connectionString: DATABASE_URL,
});

pool.on("connect", () => console.log("connected to db"));

module.exports = pool;

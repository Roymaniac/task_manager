require("dotenv").config({ debug: process.env.DEBUG });

const { env } = process;

module.exports = {
  PORT: env.PORT,
  DB_URI: env.DB_URI,
};

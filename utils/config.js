require("dotenv").config();

const { env } = process;

module.exports = {
  PORT: env.PORT,
  DB_URI: env.DB_URI,
};

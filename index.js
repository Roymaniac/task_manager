const express = require("express");
const db = require("./db/config");
const cors = require("cors");
const env = require("dotenv").config({ debug: process.env.DEBUG });

const app = express();
const PORT = process.env.PORT;

db();

app.use(express.json());
app.use(cors());

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

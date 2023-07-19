const express = require("express");
const db = require("./utils/connect");
const cors = require("cors");
const { PORT } = require("./utils/config");

const taskRoutes = require("./modules/task/task.route");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/tasks", taskRoutes);

// Move the database connection inside the server listen callback
db.connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
  });
});

module.exports = app;

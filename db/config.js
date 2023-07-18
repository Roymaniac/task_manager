const mongoose = require("mongoose");

// Connect to MongoDB (make sure MongoDB is running)
const dbConfig = () =>
  mongoose.connect("mongodb://localhost:27017/task_manager", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

// Check the connection status and log a message
mongoose.connection.once("open", () => {
  console.log("Connected to the database!");
});

module.exports = dbConfig;

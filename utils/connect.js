const mongoose = require("mongoose");
const { DB_URI } = require("../utils/config");

// Connect to MongoDB (make sure MongoDB is running)
async function connectToDatabase() {
  try {
    await mongoose.connect(`${DB_URI}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to the database!");
  } catch (err) {
    console.error(err);
  }
}

async function closeDatabaseConnection() {
  try {
    await mongoose.disconnect();
    console.log("Closed the database connection!");
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  connectToDatabase,
  closeDatabaseConnection,
};

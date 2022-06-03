
const mongoose = require("mongoose");

const MONGO_URI = "mongodb://mongodb:27017";

mongoose
  .connect(MONGO_URI)
  .then((dbName) => {
    console.log(
      `Connected to MongoDocker! Database name: "${dbName.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });


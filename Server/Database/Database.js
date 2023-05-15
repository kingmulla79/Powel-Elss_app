require("dotenv").config();
const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DBURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((result) => {
      console.log(`MongoDB connected to server: ${result.connection.host}`);
    })
    .catch((err) => {
      console.log("error connecting to database");
      console.log(err);
    });
};

module.exports = connectDatabase;

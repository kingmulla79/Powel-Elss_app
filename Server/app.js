// third-party package and default package imports
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const UserDetailsRoutes = require("./routes/UserDetails");
const DashboardRoutes = require("./routes/Dashboard");
const connectDatabase = require("./Database/Database");
const cookieParser = require("cookie-parser");
const app = express();

//connection to DB

connectDatabase();

const server = app.listen(process.env.APP_PORT, () => {
  console.log(
    `Server is running on port http://localhost/${process.env.APP_PORT}`
  );
});

//middleware and static files
app.use(morgan("dev"));
app.use(cors());
app.use("/", express.static("uploads"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api/auth", UserDetailsRoutes);
app.use("/api/dashboard", DashboardRoutes);

// handling uncaught Exceptions
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down server`);
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down server for ${err}`);
  console.log(`Shutting down server for unhandled promise rejection`);

  server.close(() => {
    process.exit();
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "The route doesn't exist",
  });
});

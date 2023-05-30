// third-party package and default package imports
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { UserDetailsRoutes, DashboardRoutes } = require("./router");
const connectDatabase = require("./Database/Database");
const cookieParser = require("cookie-parser");
// const cookieSession = require("cookie-session");
const app = express();

//connection to DB

connectDatabase();

const server = app.listen(process.env.APP_PORT, () => {
  console.log(
    `Server is running on port http://localhost:${process.env.APP_PORT}`
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

// google oauth start
const passport = require("passport");
require("./passport");
const session = require("express-session");
// After you declare "app"
app.use(session({ secret: process.env.SESSION_SECRET }));
app.use(passport.initialize());
// app.use(
//   cookieSession({
//     name: "tuto-session",
//     keys: ["key1", "key2"],
//   })
// );
app.use(passport.session());
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/failed", (req, res) => {
  res.send("failed");
});
app.get("/success", (req, res) => {
  res.render("success");
});
app.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
app.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/failed",
  }),
  function (req, res) {
    res.redirect("/success");
  }
);

app.get("/logout", (req, res) => {
  req.session = null;
  req.logOut();
  res.redirect("/");
});
//google oauth end

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

// error 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "The route doesn't exist",
  });
});

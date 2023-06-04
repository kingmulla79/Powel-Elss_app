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

// google oauth start
const passport = require("passport");
require("./passport");
const session = require("express-session");
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);
app.use(passport.initialize());

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/google/success",
    failureRedirect: "/auth/google/failure",
  })
);

app.get("/auth/google/success", (req, res) => {
  res.render("dashboard");
});
app.get("/auth/google/logout", (req, res) => {
  req.session.destroy();
  res.render("logout");
});

// google oauth end

// error 404
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "The route doesn't exist",
  });
});

const express = require("express");
const route = express.Router();
const services = require("../services/render");
const controller = require("../controller/controller");
const {
  isAuth,
  isAuthAdmin,
  isLoggedIn,
  isLoggedOut,
} = require("../middlewares/authMiddleware");

route.get("/", isAuth, services.homeRoutes);

route.get("/add-user", isAuth, services.add_user);

route.get("/update-user", isAuth, services.update_user);

// Login Page render
route.get("/login", isLoggedOut, isAuthAdmin, services.login);

// Home Page render
route.get("/home", isLoggedIn, services.home);

// Adimin Login Page render
route.get("/adminlogin", isAuthAdmin, services.adminlogin);

// Register User
route.get("/register", isLoggedOut, isAuthAdmin, services.register);

// postMethod adminlogin
route.post("/adminlogin", services.isAdmin);

// post for admin home
route.post("/", services.logoutAdmin);

// post for home users
route.post("/home", services.logoutUser);

//API
route.post("/api/users", controller.create);
route.get("/api/users", controller.find);
route.put("/api/users/:id", controller.update);
route.delete("/api/users/:id", controller.delete);

//Custom API for login
route.post("/api/login", controller.isUser);
// 404 error
route.get("*", services.notFound);
module.exports = route;

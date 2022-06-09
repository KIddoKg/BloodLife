const express = require("express");
// import homeController from "../controller/homeController";
const homeController = require("../controller/homeController");
const auth = require("../configs/auth");

let router = express.Router();

const initHomepage = (app) => {
  // Get page
  router.get("/", auth.isAuth, homeController.getHomepage);

  // Login Route
  router.get("/login", auth.isAuth, homeController.ShowLogin);

  // Forgot Password Route
  router.get("/forgotPass", homeController.getForgot);

  // Reset Password Route
  router.get(`/resetPass/:id`, homeController.getReset);

  // Register Route
  router.get("/signup", auth.isAuth, homeController.Signup);

  // Register POST Handle
  router.post("/signup", homeController.Register);

  // Email ACTIVATE Handle
  router.get("/activate/:token", homeController.activateHandle);

  // Forgot Password Handle
  router.post("/forgotPass", homeController.forgotPassword);

  // Reset Password Handle
  router.post(`/resetPass/:id`, homeController.resetPassword);

  // Reset Password Handle
  router.get("/forgotPass/:token", homeController.gotoReset);

  // Post login donor
  router.post("/login", homeController.Login);

  return app.use("/", router);
};

module.exports = initHomepage;

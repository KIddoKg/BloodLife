const express = require("express");
// import donorController from "../controller/donorController";
const donorController = require("../controller/donorController");
// import auth from "../configs/auth";
const auth = require("../configs/auth");

let router = express.Router();

const initDonorpage = (app) => {
  router.get("/", auth.loggedin, donorController.HomepageDonor);
  router.get("/nutri", auth.loggedin, donorController.Nutripage);
  router.get("/appointment", auth.loggedin, donorController.Appointment);
  router.get("/information", auth.loggedin, donorController.Information);
  router.get("/updateDonor", auth.loggedin, donorController.UpdateDonor);

  router.get("/logout", auth.loggedin, donorController.Logout);
  return app.use("/donor", router);
};

module.exports = initDonorpage;

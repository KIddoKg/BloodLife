const express = require("express");
// import donorController from "../controller/donorController";
const donorController = require("../controller/donorController");
// import auth from "../configs/auth";
const auth = require("../configs/auth");

let router = express.Router();

const initDonorpage = (app) => {
  router.get("/", auth.loggedIn, donorController.HomepageDonor);

  router.get("/nutri", auth.loggedIn, donorController.Nutripage);

  router.get("/showdonate", auth.loggedIn, donorController.Showdonate);

  router.get("/appointment", auth.loggedIn, donorController.Appointment);

  router.post("/appointment", donorController.Appointmentpost);

  router.get("/information", auth.loggedIn, donorController.Information);

  router.post("/information/update", donorController.Updatepage);

  router.get(
    "/information/update",
    auth.loggedIn,
    donorController.Updatepagefill
  );

  router.get(
    "/information/avatar",
    auth.loggedIn,
    donorController.Updateavatar
  );

  router.post("/information/avatar", donorController.Posteavatar);

  router.get("/logout", auth.loggedIn, donorController.Logout);

  return app.use("/donor", router);
};

module.exports = initDonorpage;

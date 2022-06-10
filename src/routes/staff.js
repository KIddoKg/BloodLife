const express = require("express");
// import staffController from "../controller/staffController";
const staffController = require("../controller/staffController");
const auth = require("../configs/auth");

let router = express.Router();

const initStaffpage = (app) => {
  router.get("/", auth.loggedInStaff, staffController.getHomepage);
  router.get("/addBlood", auth.loggedInStaff, staffController.AddBlood);
  router.post("/addBlood", staffController.AddBloodPost);
  router.get("/searching", auth.loggedInStaff, staffController.AddBloodSearch);
  router.post("/update", staffController.AddBloodUpdate);
  router.get("/updateDonor", auth.loggedInStaff, staffController.UpdateDonor);

  router.get("/logout", auth.loggedInStaff, staffController.Logout);
  return app.use("/staff", router);
};

module.exports = initStaffpage;

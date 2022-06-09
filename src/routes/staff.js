const express = require("express");
// import staffController from "../controller/staffController";
const staffController = require("../controller/staffController");

let router = express.Router();

const initStaffpage = (app) => {
  router.get("/", staffController.getHomepage);
  router.get("/addBlood", staffController.AddBlood);
  // router.get("/updateDonor", staffController.UpdateDonor);

  return app.use("/staff", router);
};

module.exports = initStaffpage;

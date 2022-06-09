const express = require("express");
// import staffController from "../controller/staffController";
const staffController = require("../controller/staffController");

let router = express.Router();

const initStaffpage = (app) => {
  router.get("/", staffController.getHomepage);
  router.get("/addBlood", staffController.AddBlood);
  router.post("/addBlood", staffController.AddBloodPost);
  router.get("/searching", staffController.AddBloodSearch);
  router.post("/update", staffController.AddBloodUpdate);
  router.get("/updateDonor", staffController.UpdateDonor);
  // router.get("/updateDonor", staffController.UpdateDonor);

  return app.use("/staff", router);
};

module.exports = initStaffpage;

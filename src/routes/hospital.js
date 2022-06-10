const express = require("express");
// import hospitalController from "../controller/hospitalController";
const hospitalController = require("../controller/hospitalController");
const auth = require("../configs/auth");

let router = express.Router();

const initHospitalpage = (app) => {
  router.get("/", auth.loggedInHospital, hospitalController.getHomepage);
  router.get("/order", auth.loggedInHospital, hospitalController.OrderLoading);
  router.get("/ordering", auth.loggedInHospital, hospitalController.Searching);
  router.post("/ordering", hospitalController.Ordering);
  router.get(
    "/contactus",
    auth.loggedInHospital,
    hospitalController.Notification
  );
  router.post("/contactus", hospitalController.SendMessage);
  router.get(
    "/historyOrder",
    auth.loggedInHospital,
    hospitalController.HistoryOrder
  );

  router.get("/logout", auth.loggedInHospital, hospitalController.Logout);
  return app.use("/hospital", router);
};

module.exports = initHospitalpage;

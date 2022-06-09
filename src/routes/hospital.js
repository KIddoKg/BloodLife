const express = require("express");
// import hospitalController from "../controller/hospitalController";
const hospitalController = require("../controller/hospitalController");

let router = express.Router();

const initHospitalpage = (app) => {
  router.get("/", hospitalController.getHomepage);
  router.get("/order", hospitalController.OrderLoading);
  router.get("/ordering", hospitalController.Searching);
  router.post("/ordering", hospitalController.Ordering);
  router.get("/contactus", hospitalController.Notification);
  router.post("/contactus", hospitalController.SendMessage);
  router.get("/historyOrder", hospitalController.HistoryOrder);

  return app.use("/hospital", router);
};

module.exports = initHospitalpage;

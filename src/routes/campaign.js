const express = require("express");
const campaignController = require("../controller/campaignController");

let router = express.Router();

const initCampaignpage = (app) => {
  router.get("/", campaignController.getHomepage);
  router.get("/event", campaignController.event);
  router.post("/event", campaignController.Addevent);
  router.get("/delete-event", campaignController.deleteevent);

  return app.use("/campaign", router);
};

module.exports = initCampaignpage;

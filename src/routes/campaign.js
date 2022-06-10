const express = require("express");
const campaignController = require("../controller/campaignController");
const auth = require("../configs/auth");

let router = express.Router();

const initCampaignpage = (app) => {
  router.get("/", auth.loggedInCollab, campaignController.getHomepage);
  router.get("/event", auth.loggedInCollab, campaignController.event);
  router.post("/event", campaignController.Addevent);
  router.get(
    "/delete-event",
    auth.loggedInCollab,
    campaignController.deleteevent
  );

  router.get("/logout", auth.loggedInCollab, campaignController.Logout);

  return app.use("/campaign", router);
};

module.exports = initCampaignpage;

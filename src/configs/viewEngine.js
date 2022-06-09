const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const configViewEngine = (app) => {
  app.use(express.static("./src/public"));
  app.set("view engine", "ejs");
  app.set("views", "./src/views");

  // setup layouts
  app.use(expressLayouts);
  app.set("layout", "./layouts/main.ejs");
};

module.exports = configViewEngine;

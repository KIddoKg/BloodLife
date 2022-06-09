const express = require("express");
const app = express();

// import configViewEngine from "./configs/viewEngine";
const configViewEngine = require("./configs/viewEngine");
// import connection from "./configs/connectDB";
const connection = require("./configs/connectDB");
// import bodyParser from "body-parser";
const bodyParser = require("body-parser");
require("dotenv").config();

// import flash from "connect-flash";
const flash = require("connect-flash");
// import session from "express-session";
const session = require("express-session");

// setup body-parser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// import routes
// import homeRoute from "./routes/home";
// import donorRoute from "./routes/donor";
// import hospitalRoute from "./routes/hospital";
// import staffRoute from "./routes/staff";
const homeRoute = require("./routes/home");
const donorRoute = require("./routes/donor");
const hospitalRoute = require("./routes/hospital");
const staffRoute = require("./routes/staff");

// app.use(expressLayouts);

// setup view engine
configViewEngine(app);

// setup session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);

// Passport middleware
// app.use(passport.initialize());
// app.use(passport.session());

// setup flash
app.use(flash());

// Global vars
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.error = req.flash("error");
  next();
});

// setup routes
homeRoute(app);
donorRoute(app);
hospitalRoute(app);
staffRoute(app);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

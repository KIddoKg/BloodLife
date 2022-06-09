// const express = require("express");
// import connection from "../configs/connectDB";
const connection = require("../configs/connectDB");
// import bcrypt, { hash } from "bcryptjs";
const bcrypt = require("bcryptjs");
// import Donor from "../models/donorModels";
const Donor = require("../models/donorModels");
// import nodemailer from "nodemailer";
const nodemailer = require("nodemailer");
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
// import jwt from "jsonwebtoken";
const jwt = require("jsonwebtoken");

let getHomepage = (req, res) => {
  return res.render("home_main.ejs");
};

let Nutripage = (req, res) => {
  return res.render("nutri.ejs");
};

let ShowLogin = (req, res) => {
  // return res.send("Login");
  return res.render("login.ejs", { layout: "./layouts/authentication" });
};

let Signup = (req, res) => {
  return res.render("Signup.ejs", { layout: "./layouts/authentication" });
};

let getForgot = (req, res) => {
  return res.render("pass_forgot.ejs", {
    layout: "./layouts/authentication",
    id: req.params.id,
  });
};

let getReset = (req, res) => {
  return res.render("pass_reset.ejs", {
    layout: "./layouts/authentication",
  });
};

let Register = (req, res) => {
  const {
    name,
    ssn,
    gender,
    birthday,
    phone,
    email,
    address,
    password,
    pass_confirm,
  } = req.body;

  let errors = [];

  // Check required fields
  if (
    !name ||
    !ssn ||
    !gender ||
    !birthday ||
    !phone ||
    !email ||
    !address ||
    !password ||
    !pass_confirm
  ) {
    errors.push({ msg: "Please fill in all fields" });
  }

  if (password !== pass_confirm) {
    errors.push({ msg: "Passwords do not match" });
  }

  if (password.length < 6) {
    errors.push({ msg: "Password should be at least 6 characters" });
  }

  if (errors.length > 0) {
    res.render("signup.ejs", {
      layout: "./layouts/authentication.ejs",
      errors,
      name,
      ssn,
      gender,
      birthday,
      phone,
      email,
      address,
      password,
      pass_confirm,
    });
  } else {
    var sql = "SELECT * FROM Donor WHERE email = ?";
    connection.query(sql, [email], (err, data) => {
      if (err) throw err;
      if (data.length > 0) {
        // User already exists
        errors.push({ msg: "Email ID already registered" });
        res.render("signup.ejs", {
          layout: "./layouts/authentication.ejs",
          errors,
          name,
          ssn,
          gender,
          birthday,
          phone,
          email,
          address,
          password,
          pass_confirm,
        });
      } else {
        const oauth2Client = new OAuth2(
          process.env.CLIENT_ID, // ClientID
          process.env.CLIENT_SECRET, // Client Secret
          process.env.REDIRECT_URI // Redirect URL
        );

        oauth2Client.setCredentials({
          refresh_token: process.env.REFRESH_TOKEN,
        });
        const accessToken = oauth2Client.getAccessToken();

        const token = jwt.sign(
          { name, ssn, gender, birthday, phone, email, address, password },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "30m" }
        );

        const CLIENT_URL = "http://" + req.headers.host;

        const output = `
        <h2>Please click on below link to activate your account</h2>
        <p>${CLIENT_URL}/activate/${token}</p>
        <p><b>NOTE: </b> The above activation link expires in 30 minutes.</p>
        `;

        const transporter = nodemailer.createTransport({
          service: process.env.SERVICE,
          auth: {
            type: "OAuth2",
            user: "aidoctor.se@gmail.com",
            clientId: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            refreshToken: process.env.REFRESH_TOKEN,
            accessToken: accessToken,
          },
        });

        // send mail with defined transport object
        const mailOptions = {
          from: '"Auth Admin" <aidoctor.se@gmail.com>', // sender address
          to: email, // list of receivers
          subject: "Account Verification: NodeJS Auth ✔", // Subject line
          generateTextFromHTML: true,
          html: output, // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log(error);
            req.flash(
              "error_msg",
              "Something went wrong on our end. Please register again."
            );
            res.redirect("/login");
          } else {
            console.log("Mail sent : %s", info.response);
            req.flash(
              "success_msg",
              "Activation link sent to email ID. Please activate to log in."
            );
            res.redirect("/login");
          }
        });
      }
    });
  }
};

// Activate Account Handle
let activateHandle = (req, res) => {
  const token = req.params.token;
  let errors = [];
  if (token) {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decodedToken) => {
      if (err) {
        req.flash(
          "error_msg",
          "Incorrect or expired link! Please register again."
        );
        res.redirect("/signup");
      } else {
        const { name, ssn, gender, birthday, phone, email, address, password } =
          decodedToken;
        var sql = "SELECT * FROM Donor WHERE email = ?";
        connection.query(sql, [email], function (err, data) {
          if (err) throw err;
          if (data.length > 0) {
            req.flash("error_msg", "Email ID already registered! Please login");
            res.redirect("/login");
          } else {
            const newDonor = new Donor({
              name,
              ssn,
              gender,
              birthday,
              phone,
              email,
              address,
              password,
            });
            bcrypt.genSalt(10, (err, salt) =>
              bcrypt.hash(newDonor.password, salt, (err, hash) => {
                if (err) throw err;
                // Set password to hashed
                newDonor.password = hash;
                var sql =
                  "INSERT INTO Donor(name, ssn, gender, birthday, phone, email, address, password) Values (?, ?, ?, ?, ?, ?, ?, ?)";
                var Values = [
                  name,
                  ssn,
                  gender,
                  birthday,
                  phone,
                  email,
                  address,
                  hash,
                ];
                connection.query(sql, Values, function (err, data) {
                  if (err) throw err;
                });
                req.flash(
                  "success_msg",
                  "Account activated. You can now login"
                );
                res.redirect("/login");
              })
            );
          }
        });
      }
    });
  } else {
    console.log("Account activation error!");
  }
};

//------------ Forgot Password Handle ------------//
let forgotPassword = (req, res) => {
  const { email } = req.body;

  let errors = [];

  // Check required fields
  if (!email) {
    errors.push({ msg: "Please enter an email ID" });
  }

  if (errors.length > 0) {
    res.render("pass_forgot.ejs", {
      layout: "./layouts/authentication",
      errors,
      email,
    });
  } else {
    var sql = "SELECT * FROM Donor WHERE email = ?";
    connection.query(sql, [email], function (err, data) {
      if (err) throw err;

      if (!data.length) {
        errors.push({ msg: "User with email ID does not exist!" });
        res.render("pass_forgot.ejs", {
          layout: "./layouts/authentication",
          errors,
          email,
        });
      } else {
        const oauth2Client = new OAuth2(
          process.env.CLIENT_ID, // ClientID
          process.env.CLIENT_SECRET, // Client Secret
          process.env.REDIRECT_URI // Redirect URL
        );

        oauth2Client.setCredentials({
          refresh_token: process.env.REFRESH_TOKEN,
        });
        const accessToken = oauth2Client.getAccessToken();

        const token = jwt.sign(
          { id: data[0].id },
          process.env.REFRESH_TOKEN_SEREST,
          {
            expiresIn: "30m",
          }
        );

        const CLIENT_URL = "http://" + req.headers.host;
        const output = `
                <h2>Please click on below link to reset your account password</h2>
                <p>${CLIENT_URL}/forgotPass/${token}</p>
                <p><b>NOTE: </b> The activation link expires in 30 minutes.</p>
                `;
        var link = { resetLink: token };
        console.log(link);
        var sqlUpdate = "Update Donor Set resetLink =? where email = ?";
        connection.query(
          sqlUpdate,
          [link.resetLink, email],
          function (err, success) {
            if (err) {
              errors.push({ msg: "Error resetting password!" });
              res.render("pass_forgot.ejs", {
                layout: "./layouts/authentication",
                errors,
                email,
              });
            } else {
              const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                  type: "OAuth2",
                  user: "aidoctor.se@gmail.com",
                  clientId: process.env.CLIENT_ID,
                  clientSecret: process.env.CLIENT_SECRET,
                  refreshToken: process.env.REFRESH_TOKEN,
                  accessToken: accessToken,
                },
              });

              // send mail with defined transport object
              const mailOptions = {
                from: '"Auth Admin" <aidoctor.se@gmail.com>', // sender address
                to: email, // list of receivers
                subject: "Account Password Reset: NodeJS Auth ✔", // Subject line
                html: output, // html body
              };

              transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                  console.log(error);
                  req.flash(
                    "error_msg",
                    "Something went wrong on our end. Please try again later."
                  );
                  res.redirect("/forgotPass");
                } else {
                  console.log("Mail sent : %s", info.response);
                  req.flash(
                    "success_msg",
                    "Password reset link sent to email ID. Please follow the instructions."
                  );
                  res.redirect("/login");
                }
              });
            }
          }
        );
      }
    });
  }
};

let gotoReset = (req, res) => {
  const { token } = req.params;
  // const email = req.params.email;
  if (token) {
    jwt.verify(token, process.env.REFRESH_TOKEN_SEREST, (err, decodedToken) => {
      if (err) {
        req.flash("error_msg", "Incorrect or expired link! Please try again.");
        res.redirect("/login");
      } else {
        console.log(token);
        const { id } = decodedToken;

        var sql = "SELECT * FROM Donor WHERE id = ?";
        connection.query(sql, [id], (err, user) => {
          if (err) {
            req.flash(
              "error_msg",
              "User with email ID does not exist! Please try again."
            );
            res.redirect("/login");
          } else {
            res.redirect(`/resetPass/${id}`);
          }
        });
      }
    });
  } else {
    console.log("Password reset error!");
  }
};

let resetPassword = (req, res) => {
  var { password, pass_confirm } = req.body;
  const id = req.params.id;

  //------------ Checking required fields ------------//
  if (!password || !pass_confirm) {
    req.flash("error_msg", "Please enter all fields.");
    res.redirect(`/resetPass/${id}`);
  }

  //------------ Checking password length ------------//
  else if (password.length < 6) {
    req.flash("error_msg", "Password must be at least 6 characters.");
    res.redirect(`/resetPass/${id}`);
  }

  //------------ Checking password mismatch ------------//
  else if (password != pass_confirm) {
    req.flash("error_msg", "Passwords do not match.");
    res.redirect(`/resetPass/${id}`);
  } else {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) throw err;
        password = hash;
        // console.log(password);

        var sqlUpdate = "Update Donor Set password =? where id = ?";
        connection.query(sqlUpdate, [password, id], (err, result) => {
          if (err) {
            req.flash("error_msg", "Error resetting password!");
            res.redirect(`/resetPass/${id}`);
          } else {
            req.flash("success_msg", "Password reset successfully!");
            res.redirect("/login");
          }
        });
      });
    });
  }
};

let Login = (req, res) => {
  const { email, password } = req.body;
  let errors = [];
  if (!email || !password) {
    errors.push({ msg: "Please fill in all fields" });
  }
  if (errors.length > 0) {
    res.render("login.ejs", {
      layout: "./layouts/authentication.ejs",
      errors,
      email,
      password,
    });
  } else {
    var sql = "select * from Donor Where email = ?";
    connection.query(sql, [email], (err, data, fields) => {
      if (err) throw err;
      if (!data.length) {
        errors.push({ msg: "That email is not registered" });
        res.render("login.ejs", {
          layout: "./layouts/authentication.ejs",
          errors,
          email,
          password,
        });
      } else {
        bcrypt.compare(password, data[0].password, (err, result) => {
          if (result == true) {
            req.session.loggedin = true;
            req.session.data = data;
            res.redirect("/donor");
          } else {
            errors.push({ msg: "Password incorrect" });
            return res.render("login.ejs", {
              layout: "./layouts/authentication.ejs",
              errors,
              email,
              password,
            });
          }
        });
      }
    });
  }
};

module.exports = {
  getHomepage,
  Nutripage,
  ShowLogin,
  Signup,
  getForgot,
  getReset,
  Register,
  Login,
  activateHandle,
  forgotPassword,
  gotoReset,
  resetPassword,
};

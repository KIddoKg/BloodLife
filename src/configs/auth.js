// --------- Check login Donor --------- //
let loggedIn = (req, res, next) => {
  if (req.session.loggedIn) {
    res.locals.data = req.session.data;
    next();
  } else {
    res.redirect("/login");
  }
};
let isAuth = (req, res, next) => {
  if (req.session.loggedIn) {
    res.locals.data = req.session.data;
    res.redirect("/donor");
  } else {
    next();
  }
};

// --------- Check login Hospital --------- //
let loggedInHospital = (req, res, next) => {
  if (req.session.loggedInHospital) {
    res.locals.data = req.session.data;
    next();
  } else {
    res.redirect("/login");
  }
};

let isHospital = (req, res, next) => {
  if (req.session.loggedInHospital) {
    res.locals.data = req.session.data;
    res.redirect("/hospital");
  } else {
    next();
  }
};

// --------- Check login Hospital --------- //
let loggedInStaff = (req, res, next) => {
  if (req.session.loggedInStaff) {
    res.locals.data = req.session.data;
    next();
  } else {
    res.redirect("/login");
  }
};

let isStaff = (req, res, next) => {
  if (req.session.loggedInStaff) {
    res.locals.data = req.session.data;
    res.redirect("/staff");
  } else {
    next();
  }
};

// --------- Check login Collaborator--------- //
let loggedInCollab = (req, res, next) => {
  if (req.session.loggedInCollab) {
    res.locals.data = req.session.data;
    next();
  } else {
    res.redirect("/login");
  }
};

let isCollab = (req, res, next) => {
  if (req.session.loggedInCollab) {
    res.locals.data = req.session.data;
    res.redirect("/campaign");
  } else {
    next();
  }
};

module.exports = {
  loggedIn,
  isAuth,
  isHospital,
  loggedInHospital,
  loggedInStaff,
  isStaff,
  loggedInCollab,
  isCollab,
};

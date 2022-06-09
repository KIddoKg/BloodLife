// let checkLoggedIn = (req, res, next) => {
//   if (!req.isAuthenticated()) {
//     return res.redirect("/login");
//   }
//   next();
// };

// let checkLoggedOut = (req, res, next) => {
//   if (req.isAuthenticated()) {
//     return res.redirect("/nutri");
//   }
//   next();
// };

// module.exports = {
//   checkLoggedIn,
//   checkLoggedOut,
// };

let loggedin = (req, res, next) => {
  if (req.session.loggedin) {
    res.locals.data = req.session.data;
    next();
  } else {
    res.redirect("/login");
  }
};

let isAuth = (req, res, next) => {
  if (req.session.loggedin) {
    res.locals.data = req.session.data;
    res.redirect("/donor");
  } else {
    next();
  }
};
module.exports = {
  loggedin,
  isAuth,
};

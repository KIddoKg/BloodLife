let HomepageDonor = (req, res) => {
  return res.render("home_donor.ejs");
};

let Nutripage = (req, res) => {
  return res.render("nutri.ejs");
};

let Appointment = (req, res) => {
  return res.render("appointment.ejs");
};

let Information = (req, res) => {
  return res.render("information.ejs");
};

let UpdateDonor = (req, res) => {
  return res.render("updateDonor.ejs");
};

// Logout handle
let Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
};

module.exports = {
  HomepageDonor,
  Nutripage,
  Appointment,
  Information,
  UpdateDonor,
  Logout,
};

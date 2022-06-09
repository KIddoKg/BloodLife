let getHomepage = (req, res) => {
  return res.render("home_staff.ejs");
};

let AddBlood = (req, res) => {
  return res.render("addBlood.ejs");
};

// let UpdateDonor = (req, res) => {
//   return res.render("updateDonor.ejs");
// };

module.exports = {
  getHomepage,
  AddBlood,
  // UpdateDonor,
};

let getHomepage = (req, res) => {
  return res.render("home_hospital.ejs");
};

let Ordering = (req, res) => {
  return res.render("orderBlood.ejs");
};

let HistoryOrder = (req, res) => {
  return res.render("history_hospital.ejs");
};

module.exports = {
  getHomepage,
  Ordering,
  HistoryOrder,
};

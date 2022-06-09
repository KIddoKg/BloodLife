const connection = require("../configs/connectDB");

function format(date) {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return day + "/" + month + "/" + year;
}

let getHomepage = (req, res) => {
  connection.connect(function (error) {
    if (error) console.log(error);
    var sql = "select * from campaign";
    connection.query(sql, function (error, result) {
      if (error) {
        console.log(error);
      }
      const startDate = [];
      const endDate = [];

      for (var i = 0; i < result.length; i++) {
        startDate[i] = format(result[i].start_date);
        endDate[i] = format(result[i].end_date);
      }
      res.render("./home_hospital", {
        event: result,
        start_date: startDate,
        end_date: endDate,
      });
    });
  });
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

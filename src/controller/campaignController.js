const connection = require("../configs/connectDB");

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
      res.render("./home_campaign", {
        event: result,
        start_date: startDate,
        end_date: endDate,
      });
    });
  });
};

function format(date) {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return day + "/" + month + "/" + year;
}

let event = (req, res) => {
  const bdid = req.session.data[0].bdid;
  connection.connect(function (error) {
    if (error) console.log(error);
    var sql =
      "select DISTINCT * from campaign c,BloodDriveLeader b where c.bdid=b.bdid and c.bdid = ?;";

    connection.query(sql, [bdid], function (error, result) {
      console.log(result);
      if (error) {
        console.log(error);
      }
      const startDate = [];
      const endDate = [];

      for (var i = 0; i < result.length; i++) {
        startDate[i] = format(result[i].start_date);
        endDate[i] = format(result[i].end_date);
      }
      res.render("./campaign", {
        event: result,
        start_date: startDate,
        end_date: endDate,
      });
    });
  });
  // return res.render("campaign.ejs");
  // connection.connect(function (error) {
  //   if (error) console.log(error);
  //   var sql = "select * from blooddriveleader";
  //   connection.query(sql, function (error, result) {
  //     if (error) {
  //       console.log(error);
  //     }
  //     res.render("campaign.ejs", {
  //       event: result,
  //     });
  //   });
  // });
};

let Addevent = (req, res) => {
  var eventname = req.body.eventname;
  var opentime = req.body.opentime;
  var startdate = req.body.startdate;
  var enddate = req.body.enddate;
  var addrevent = req.body.addrevent;
  var pledgenumber = req.body.pledgenumber;

  const bdid = req.session.data[0].bdid;

  connection.connect(function (error) {
    console.log(error);
    var sql =
      "insert into campaign(bdid ,cname, open_time, start_date, end_date, address, pledge_number) values (? ,?,?, ?, ?, ?,?);";

    connection.query(
      sql,
      [bdid, eventname, opentime, startdate, enddate, addrevent, pledgenumber],
      function (error, result) {
        console.log(error);
        if (error) {
          res.render("./partials/error_msg", {
            message: "Error Cannot insert Event ",
            layout: "./layouts/authentication",
          });
        } else {
          res.render("./partials/success_msg", {
            message: "Success Event was added ",
            layout: "./layouts/authentication",
          });
        }
      }
    );
  });
};

let deleteevent = (req, res) => {
  connection.connect(function (error) {
    if (error) console.log(error);
    var cid = req.query.cid;

    var sql = "DELETE from campaign where cid=?";

    connection.query(sql, [cid], function (error, result) {
      console.log(error);
      if (error) {
        res.render("./partials/error_msg", {
          message: "Error Cannot delete Event ",
          layout: "./layouts/authentication",
        });
      } else {
        res.render("./partials/success_msg", {
          message: "Success Event was delete ",
          layout: "./layouts/authentication",
        });
      }
    });
  });
};

// Logout handle
let Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
};

module.exports = {
  event,
  getHomepage,
  Addevent,
  deleteevent,
  Logout,
};

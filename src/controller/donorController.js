const connection = require("../configs/connectDB");

function format(date) {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return day + "/" + month + "/" + year;
}

let HomepageDonor = (req, res) => {
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
      res.render("./home_donor", {
        event: result,
        start_date: startDate,
        end_date: endDate,
      });
    });
  });
};

let Nutripage = (req, res) => {
  return res.render("nutri.ejs");
};

let Appointment = (req, res) => {
  var iddonorsea = "D0001";
  connection.connect(function (error) {
    if (error) console.log(error);
    var sql = "select * from Donor where did = ?";
    connection.query(sql, [iddonorsea], function (error, result) {
      if (error) {
        console.log(error);
      }
      res.render("./appointment", {
        app: result,
      });
    });
  });
};

let Information = (req, res) => {
  var iddonorsea = "D0001";
  connection.connect(function (error) {
    if (error) console.log(error);
    var sql =
      "SELECT * ,SUM(volume) AS total_volume FROM donor d,bloodstock  where d.did LIKE ? ;";

    var values = [[iddonorsea]];

    connection.query(sql, [values], function (error, result) {
      if (error) {
        console.log(error);
      }
      const dobDate = [];

      for (var i = 0; i < result.length; i++) {
        dobDate[i] = format(result[i].birthday);
        result[i].birthday = dobDate[i];
      }

      console.log(iddonorsea);
      // res.render("./addBlood",{donor:result});
      console.log(result);

      res.render("information.ejs", { info: result });
    });
  });
};

let Showdonate = (req, res) => {
  var iddonorsea = "D0001";
  connection.connect(function (error) {
    if (error) console.log(error);
    var sql = "SELECT * FROM bloodstock  where did LIKE ?";

    var values = [[iddonorsea]];

    connection.query(sql, [values], function (error, result) {
      if (error) {
        console.log(error);
      }
      const inputDate = [];
      const isordered = [];

      for (var i = 0; i < result.length; i++) {
        inputDate[i] = format(result[i].input_date);
        result[i].input_date = inputDate[i];
      }
      for (var i = 0; i < result.length; i++) {
        if (result[i].is_ordered == 1) {
          isordered[i] = "ordered";
        } else {
          isordered[i] = "not ordered yet";
        }
        result[i].is_ordered = isordered[i];
      }

      console.log(iddonorsea);
      // res.render("./addBlood",{donor:result});
      console.log(result);

      res.send(result);
    });
  });
};

let Updatepagefill = (req, res) => {
  var iddonorsea = "D0001";
  connection.connect(function (error) {
    if (error) console.log(error);
    var sql = "SELECT * FROM donor  where did LIKE ?";

    var values = [[iddonorsea]];

    connection.query(sql, [values], function (error, result) {
      if (error) {
        console.log(error);
      }
      const dobDate = [];

      for (var i = 0; i < result.length; i++) {
        dobDate[i] = format(result[i].birthday);
        result[i].birthday = dobDate[i];
      }

      console.log(iddonorsea);
      // res.render("./addBlood",{donor:result});
      console.log(result);

      res.render("updateDonor.ejs", {
        fill: result,
        layout: "./layouts/authentication",
      });
    });
  });
};
let Updatepage = (req, res) => {
  var username = req.body.username;
  var ssn = req.body.ssn;
  var gender = req.body.gender;

  var dob = req.body.dob;
  var phone = req.body.phone;
  var email = req.body.email;
  var addr = req.body.addr;

  var iddonorup = "D0001";

  connection.connect(function (error) {
    console.log(error);
    var sql =
      "update donor set name = ?, ssn = ?, gender = ?, birthday = ?, phone = ?, email = ?, address = ? where did = ?";

    connection.query(
      sql,
      [username, ssn, gender, birthday, phone, email, addr, iddonorup],
      function (error, result) {
        console.log(result);
        console.log(error);
        console.log(username);

        if (error) {
          res.render("./partials/error_msg", {
            message: "Error Cannot update infomation",
            layout: "./layouts/authentication",
          });
        } else {
          res.render("./partials/success_msg", {
            message: "Success Update information",
            layout: "./layouts/authentication",
          });
        }
      }
    );
  });
};

let Updateavatar = (req, res) => {
  return res.render("avatar.ejs", { layout: "./layouts/authentication" });
};

let Posteavatar = (req, res) => {
  var img = req.body.img;

  var iddonorup = "D0001";

  connection.connect(function (error) {
    console.log(error);
    var sql = "update donor set imgid = ?where did = ?";

    connection.query(sql, [img, iddonorup], function (error, result) {
      console.log(result);
      console.log(error);
      console.log(img);

      if (error) {
        res.render("./partials/error_msg", {
          message: "Error Cannot update infomation",
          layout: "./layouts/authentication",
        });
      } else {
        res.render("./partials/success_msg", {
          message: "Success Update information",
          layout: "./layouts/authentication",
        });
      }
    });
  });
};
let Appointmentpost = (req, res) => {
  var iddonor = req.body.iddonor;
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var date = req.body.date;
  var txtTime = req.body.txtTime;
  var message = req.body.message;

  connection.connect(function (error) {
    console.log(error);
    var sql =
      "insert into Appointment(did, appoint_date,appoint_time, mesage_note) values (?,?,?,?);";

    var values = [[iddonor, date, txtTime, message]];

    connection.query(
      sql,
      [iddonor, date, txtTime, message],
      function (error, result) {
        console.log(error);
        if (error) {
          res.render("./partials/error_msg", {
            message: "Error Cannot make Appointment",
            layout: "./layouts/authentication",
          });
        } else {
          res.render("./partials/success_msg", {
            message: "Success make Appointment ",
            layout: "./layouts/authentication",
          });
        }
      }
    );
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
  HomepageDonor,
  // Nutripage,
  Appointment,
  Information,
  Showdonate,
  Updatepagefill,
  Updatepage,
  Updateavatar,
  Posteavatar,
  Appointmentpost,
  Nutripage,
  Logout,
};

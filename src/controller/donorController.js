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
  // var iddonorsea = req.
  const iddonorsea = req.session.data[0].did;
  connection.connect(function (error) {
    if (error) console.log(error);
    var sql = "select * from Donor where did = ?";
    connection.query(sql, [iddonorsea], function (error, result) {
      if (error) {
        console.log(error);
      }
      res.render("./appointment", {
        app: result,
        layout: "./layouts/authentication",
      });
    });
  });
};

let Information = (req, res) => {
  const iddonorsea = req.session.data[0].did;
  connection.connect(function (error) {
    if (error) console.log(error);
    var sql =
      "SELECT name, ssn, imgid, gender, birthday, phone, email, address, blood_type, med_cond FROM donor  where did LIKE ? UNION SELECT bid,did, blood_type, product_type,input_date, SUM(volume) AS TotalItemsOrdered ,exp_date,is_ordered,blood_type,is_discarded from bloodstock  where did LIKE ? ;";

    // var values = [[iddonorsea]];

    connection.query(sql, [iddonorsea, iddonorsea], function (error, result) {
      if (error) {
        console.log(error);
      }
      // const dobDate = [];

      const dobDate = format(result[0].birthday);
      result[0].birthday = dobDate;

      console.log(iddonorsea);

      console.log(result);

      res.render("information.ejs", { info: result });
    });
  });
};

let Showdonate = (req, res) => {
  // var iddonorsea = "D0001";
  const iddonorsea = req.session.data[0].did;
  connection.connect(function (error) {
    if (error) console.log(error);
    var sql = "SELECT * FROM bloodstock  where did LIKE ?";

    // var values = [[iddonorsea]];

    connection.query(sql, iddonorsea, function (error, result) {
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

      console.log(result);

      res.send(result);
    });
  });
};

let Updatepagefill = (req, res) => {
  // var iddonorsea = "D0001";
  const iddonorsea = req.session.data[0].did;

  connection.connect(function (error) {
    if (error) console.log(error);
    var sql = "SELECT * FROM donor  where did LIKE ?";

    // var values = [[iddonorsea]];

    connection.query(sql, iddonorsea, function (error, result) {
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
  var { username, ssn, gender, birthday, phone, addr } = req.body;

  var iddonorup = req.session.data[0].did;
  // var iddonorup = "D0001";

  connection.connect(function (error) {
    console.log(error);
    var sql =
      "update donor set name = ?, ssn = ?, gender = ?, birthday = ?, phone = ?, address = ? where did = ?";

    connection.query(
      sql,
      [username, ssn, gender, birthday, phone, addr, iddonorup],
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

  // var iddonorup = "D0001";

  var iddonorup = req.session.data[0].did;

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
  // var iddonor = req.body.iddonor;
  // var date = req.body.date;
  // var txtTime = req.body.txtTime;
  // var message = req.body.message;

  const { iddonor, date, txtTime, message } = req.body;

  connection.connect(function (error) {
    console.log(error);
    var sql =
      "insert into Appointment(did, appoint_date,appoint_time, mesage_note) values (?,?,?,?);";

    var values = [iddonor, date, txtTime, message];

    connection.query(sql, values, function (error, result) {
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

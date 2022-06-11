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

function format(date) {
  var year = date.getFullYear();

  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : "0" + month;

  var day = date.getDate().toString();
  day = day.length > 1 ? day : "0" + day;

  return day + "/" + month + "/" + year;
}

let OrderLoading = (req, res) => {
  // var hid = "H0001";
  const hid = req.session.data[0].hid;

  // Get hospital name to display welcome
  var sqlHname = "select * from Hospital where hid = ?;";

  connection.query(sqlHname, [hid], (err, result) => {
    var hospitalName = result[0].hname;

    res.render("orderBlood.ejs", {
      hospitalName: hospitalName,
      message: "",
      orderBlood: [],
      input_date: [],
      exp_date: [],
      layout: "./layouts/authentication",
    });
  });
};

let Searching = (req, res) => {
  // var hid = "H0001";
  const hid = req.session.data[0].hid;
  var product_type = req.query.producttype;
  var blood_type = req.query.bloodtype;
  var volume = req.query.volume;

  // Get hospital name to display welcome
  var sqlHname = "select * from Hospital where hid = ?;";
  var hospitalName = "";

  connection.query(sqlHname, [hid], (err, result) => {
    hospitalName = result[0].hname;
  });

  // Search the blood stocks
  var sqlSearch =
    "select * from BloodStock where product_type = ? and blood_type = ? and volume = ? and is_ordered = 0;";

  connection.query(
    sqlSearch,
    [product_type, blood_type, volume],
    (err, result) => {
      if (err) {
        console.log(err);
      }

      if (result.length === 0) {
        res.render("notification.ejs", {
          blood_type: blood_type,
          layout: "./layouts/authentication",
        });
      } else {
        // Convert full date string to "dd/mm/yyyy" format
        const dateInput = [];
        const dateExpiry = [];
        for (var i = 0; i < result.length; i++) {
          dateInput[i] = format(result[i].input_date);
          dateExpiry[i] = format(result[i].exp_date);
        }

        res.render("orderBlood.ejs", {
          orderBlood: result,
          input_date: dateInput,
          exp_date: dateExpiry,
          hospitalName: hospitalName,
          message: "",
          layout: "./layouts/authentication",
        });
      }
    }
  );
};

let Ordering = (req, res) => {
  // var hid = "H0001";
  const hid = req.session.data[0].hid;
  var order_date = new Date();

  // Get hospital name to display welcome
  var sqlHname = "select * from Hospital where hid = ?;";

  connection.query(sqlHname, [hid], (err, result) => {
    var hospitalName = result[0].hname;

    var sqlOrder =
      "insert into Ordering(hid, bid, order_date) values (?, ?, ?);";
    var sqlUpdate = "update BloodStock set is_ordered = 1 where bid = ?;";

    const { orderedBs } = req.body;
    if (typeof orderedBs === "string") {
      connection.query(
        sqlOrder,
        [hid, orderedBs, order_date],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("insert successfully");
          }
        }
      );

      connection.query(sqlUpdate, orderedBs, (err, result) => {
        if (err) {
          console.log(err);
        } else {
          console.log("update successfully");
        }
      });

      res.render("orderBlood.ejs", {
        hospitalName: hospitalName,
        message: "Order Successfull!",
        orderBlood: [],
        input_date: [],
        exp_date: [],
        layout: "./layouts/authentication",
      });
    } else {
      Object.values(orderedBs).forEach((bid) => {
        connection.query(sqlOrder, [hid, bid, order_date], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("insert successfully");
          }
        });

        connection.query(sqlUpdate, [bid], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            console.log("update successfully");
          }
        });
      });
      res.render("orderBlood.ejs", {
        hospitalName: hospitalName,
        message: "Order Successful!",
        orderBlood: [],
        input_date: [],
        exp_date: [],
        layout: "./layouts/authentication",
      });
    }
  });
};

let Notification = (req, res) => {
  // var hid = "H0001";
  const hid = req.session.data[0].hid;

  // Get hospital name and address to display welcome
  var sqlHospital = "select * from Hospital where hid = ?;";

  connection.query(sqlHospital, [hid], (err, result) => {
    var hospitalName = result[0].hname;
    var hospitalEmail = result[0].email;

    res.render("contactus.ejs", {
      hospitalName: hospitalName,
      hospitalEmail: hospitalEmail,
      message: "",
      layout: "./layouts/authentication",
    });
  });
};

let SendMessage = (req, res) => {
  // var hid = "H0001";
  const hid = req.session.data[0].hid;
  const { subject, message } = req.body;

  // Get hospital name and address to display welcome
  var sqlHospital = "select * from Hospital where hid = ?;";
  var hospitalName = "";
  var hospitalEmail = "";

  connection.query(sqlHospital, [hid], (err, result) => {
    hospitalName = result[0].hname;
    hospitalEmail = result[0].email;
  });

  var sqlMess =
    "insert into HospitalMessage(hid, subject, message) values (?, ?, ?);";

  connection.query(sqlMess, [hid, subject, message], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("insert message successfully");
      res.render("contactus.ejs", {
        hospitalName: hospitalName,
        hospitalEmail: hospitalEmail,
        message: "Message Sent Successfully!",
        layout: "./layouts/authentication",
      });
    }
  });
};

let HistoryOrder = (req, res) => {
  // var hid = "H0001";
  const hid = req.session.data[0].hid;

  var sqlOrderHistory =
    "select B.bid, O.order_date, B.product_type, B.blood_type, B.volume, B.input_date, B.exp_date from BloodStock B, Ordering O where O.hid = ? and O.bid = B.bid order by O.order_date asc;";

  connection.query(sqlOrderHistory, [hid], (err, result) => {
    if (err) {
      console.log(err);
    }

    // Convert full date string to "dd/mm/yyyy" format
    const dateOrder = [];
    const dateInput = [];
    const dateExpiry = [];
    for (var i = 0; i < result.length; i++) {
      dateOrder[i] = format(result[i].order_date);
      dateInput[i] = format(result[i].input_date);
      dateExpiry[i] = format(result[i].exp_date);
    }

    res.render("history_hospital.ejs", {
      orderBlood: result,
      order_date: dateOrder,
      input_date: dateInput,
      exp_date: dateExpiry,
      layout: "./layouts/authentication",
    });
  });
};

let Logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw err;
    res.redirect("/");
  });
};

module.exports = {
  getHomepage,
  OrderLoading,
  Searching,
  Ordering,
  Notification,
  SendMessage,
  HistoryOrder,
  Logout,
};

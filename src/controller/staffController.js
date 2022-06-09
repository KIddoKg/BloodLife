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
      res.render("./home_staff", {
        event: result,
        start_date: startDate,
        end_date: endDate,
      });
    });
  });
};

let AddBlood = (req, res) => {
  connection.connect(function (error) {
    if (error) console.log(error);
    var sql = "select * from donor";
    connection.query(sql, function (error, result) {
      if (error) console.log(error);

      res.render("./addBlood", { donor: result });
    });
  });
  // return res.render("addBlood.ejs");
};

let AddBloodUpdate = (req, res) => {
  var bloodtypeup = req.body.bloodtypeup;
  var cancelup = req.body.cancelup;
  var medicalup = req.body.medicalup;

  var iddonorup = req.body.iddonorup;

  connection.connect(function (error) {
    console.log(error);
    var sql =
      "update donor set blood_type = ?, med_cond=?, can_donate= ? where did = ?";

    var values = [[bloodtypeup, medicalup, cancelup, iddonorup]];

    connection.query(
      sql,
      [bloodtypeup, medicalup, cancelup, iddonorup],
      function (error, result) {
        console.log(error);
        if (error) {
          res.render("./partials/error_msg", {
            message: "Error Cannot update infomation Donor ",
            layout: "./layouts/authentication",
          });
        } else {
          // res.send('ok' );

          res.render("./partials/success_msg", {
            message: "Success Update Donor",
            layout: "./layouts/authentication",
          });
        }
      }
    );
  });
};

let AddBloodPost = (req, res) => {
  // var iddonor = req.body.iddonor;
  // var bloodtype = req.body.bloodtype;
  // var producttype = req.body.producttype
  // var collection =req.body.collection;
  // var volume = req.body.volume;
  // var medical = req.body.medical;

  // connection.connect(function(error){
  //   if(error) throw error;
  //     var sql = "INSERT INTO bloodstock(did, product_type,blood_type, volume) VALUES (?, ?,?,?)";
  //   connection.query(sql, [iddonor, producttype, bloodtype , volume], function(error, result){
  //       if(error) throw error;
  //       res.send('Student Register successfull');
  //   });
  // });

  var iddonorins = req.body.iddonorins;
  var productins = req.body.productins;
  var bloodtypeins = req.body.bloodtypeins;
  var collectionins = req.body.collectionins;
  var volumeins = req.body.volumeins;
  var medicalins = req.body.medicalins;

  connection.connect(function (error) {
    console.log(error);
    var sql =
      "insert into bloodstock(did, input_date, product_type, blood_type, volume) values ( (select DISTINCT  d.did from donor d where d.did  = ?),?,?,?,?);";

    var values = [
      [iddonorins, collectionins, productins, bloodtypeins, volumeins],
    ];

    connection.query(
      sql,
      [iddonorins, collectionins, productins, bloodtypeins, volumeins],
      function (error, result) {
        console.log(error);
        if (error) {
          res.render("./partials/error_msg", {
            message: "Error Cannot insert BloodStock ",
            layout: "./layouts/authentication",
          });
        } else {
          res.render("./partials/success_msg", {
            message: "Success BloodStock was added BloodBank ",
            layout: "./layouts/authentication",
          });
        }
      }
    );
  });
  connection.connect(function (error) {
    console.log(error);
    var sql = "update donor set med_cond=? where did = ?";

    connection.query(sql, [medicalins, iddonorins], function (error, result) {
      console.log(error);
    });
  });
};

let AddBloodSearch = (req, res) => {
  var iddonorsea = req.query.iddonorsea;
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

      res.send(result);
    });
  });
};

let UpdateDonor = (req, res) => {
  return res.render("./updateDonor");
};

module.exports = {
  getHomepage,
  AddBlood,
  UpdateDonor,
  AddBloodPost,
  AddBloodSearch,
  AddBloodUpdate,
};

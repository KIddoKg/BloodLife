const sql = require("../configs/connectDB");

const Donor = function (donor) {
  this.name = donor.name;
  this.ssn = donor.ssn;
  this.gender = donor.gender;
  this.birthday = donor.birthday;
  this.phone = donor.phone;
  this.email = donor.email;
  this.address = donor.address;
  this.password = donor.password;
};

module.exports = Donor;

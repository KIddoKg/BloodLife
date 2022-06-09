// get the client
// const mysql = require("mysql2");
const mysql = require("mysql2");
require("dotenv").config();

//create the connection to database
const connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to the database");
});

// export default connection;
module.exports = connection;

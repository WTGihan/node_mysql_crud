const mysql = require("mysql");

//  create mysql connection
const dbConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "node_mysql_crud_db",
});

dbConnection.connect((error) => {
  if (error) throw error;
  console.log("Database Connected");
});

module.exports = dbConnection;

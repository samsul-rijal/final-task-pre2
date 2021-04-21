const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: null,
  database: "wiki_games",
});

connection.connect((error) => {
  if (!!error) {
    console.log(error);
  } else {
    console.log("Database Connected...");
  }
});

module.exports = connection;

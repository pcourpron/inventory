var mysql = require('mysql')
var port = process.env.PORT || 3306;

var connection = mysql.createConnection({
    host: "us-cdbr-iron-east-01.cleardb.net",
  
    // Your port; if not 3306
    port: port,
  
    // Your username
    user: "b7d125968a524d",
  
    // Your password
    password: "481fcd0a",
    database: "heroku_93e319213752dd2"
    
  });
  
  connection.connect(function(err) {
    if (err) throw err;
 
  });

  connection.query('SELECT * FROM users',function(err,res){
    console.log(res)
  })



  


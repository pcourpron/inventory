
var mysql = require('mysql')

var connection = mysql.createConnection({
    host: "us-cdbr-iron-east-01.cleardb.net",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "b7d125968a524d",

    // Your password
    password: "481fcd0a",
    database: "heroku_93e319213752dd2"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

connection.end()

document.getElementById('submit').click(function(){
    console.log('hi')
})




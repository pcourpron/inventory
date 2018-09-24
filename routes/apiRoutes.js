
var mysql = require('mysql')
var port = process.env.PORT || 5000;


module.exports = function (app) {



    app.post("/api/tables", function (req, response) {
        var inputs = req.body
        var mysql = require('mysql')
        var port = 3306;

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

        connection.connect(function (err) {
            if (err) throw err;
        });

        connection.query('SELECT * FROM users', function (err, res) {
            if (res[0].username === inputs.customerEmail && res[0].password === inputs.customerPassword){
                response.send(true)
            } 

        })
        connection.end()

        

        




    });



    app.get("/api/tables", function(req, response) {
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

        connection.connect(function (err) {
            if (err) throw err;
            

        });

        connection.query('SELECT * FROM products', function (err, res) {
            response.send(res)
        })

        connection.end()
      });



      app.post("/api/order", function (req, response) {
        var inputs = req.body
        var mysql = require('mysql')
        var port = process.env.PORT || 5000;

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

        connection.connect(function (err) {
            if (err) throw err;
            

        });
        connection.query(`SELECT * FROM products
        WHERE ?`,{item_id : parseInt(inputs.productID)}, function (err, res) {
            if (inputs.amount > res[0].stock_quantity){

            }
            else if ( inputs.amount < 0){

            }
            else{

                console.log(parseInt(res[0].stock_quantity))
                connection.query(`UPDATE products SET ? WHERE ? `,[{

                    stock_quantity: parseInt(res[0].stock_quantity) - parseInt(inputs.amount)
                },{
                    item_id : parseInt(inputs.productID)
                }],function(){
           
                

                }
                )
                
            }



            response.send(res)


           
        })

       

        




    });

}
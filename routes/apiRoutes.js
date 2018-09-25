
var mysql = require('mysql')

module.exports = function (app) {



    app.post("/api/tables", function (req, response) {
        var inputs = req.body
        console.log(req.body)
        var mysql = require('mysql')
        var port = 3306;

        var connection = mysql.createConnection({
            host: "gtizpe105piw2gfq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",

            // Your port; if not 3306
            port: port,

            // Your username
            user: "hbj13fdjgl5gdjky",

            // Your password
            password: "nfer3mqxygj3hxry",
            database: "hrhqkjdyq4hklig9"

        });

        connection.connect(function (err) {
            if (err) throw err;
        });

        
        connection.query(`SELECT * FROM users WHERE ?`,{username: inputs.customerEmail} ,function (err, res) {
            console.log(err)
            if (res[0].username === inputs.customerEmail && res[0].password === inputs.customerPassword){
                response.send(res[0].authorization)
            } 

        })
        connection.end()

        

        




    });



    app.get("/api/tables", function(req, response) {
         var connection = mysql.createConnection({
            host: "gtizpe105piw2gfq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",

            // Your port; if not 3306
            port: 3306,

            // Your username
            user: "hbj13fdjgl5gdjky",

            // Your password
            password: "nfer3mqxygj3hxry",
            database: "hrhqkjdyq4hklig9"

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
            host: "gtizpe105piw2gfq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",

            // Your port; if not 3306
            port:3306,

            // Your username
            user: "hbj13fdjgl5gdjky",

            // Your password
            password: "nfer3mqxygj3hxry",
            database: "hrhqkjdyq4hklig9"

        });

        connection.connect(function (err) {
            if (err) throw err;
            

        });
        connection.query(`SELECT * FROM products
        WHERE ?`,{item_id : parseInt(inputs.productID)}, function (err, res) {
            if (err) 
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
                }]
                )
                
            }



            response.send(res)
            connection.end()

           
        })

       

        




    });

    app.post("/api/newQuant", function (req, response) {
        var inputs = req.body
        var mysql = require('mysql')

        var connection = mysql.createConnection({
            host: "gtizpe105piw2gfq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",

            // Your port; if not 3306
            port:3306,

            // Your username
            user: "hbj13fdjgl5gdjky",

            // Your password
            password: "nfer3mqxygj3hxry",
            database: "hrhqkjdyq4hklig9"

        });
        connection.connect(function (err) {
            if (err) throw err;
            

        });
      
        connection.query('UPDATE products SET ? WHERE ?',[{stock_quantity: parseInt(inputs.quantity)},{item_id: parseInt(inputs.item)}], function (err, res){
            response.send(res)
        })


    });

    app.post("/api/newInv", function (req, response) {
        var inputs = req.body
        var mysql = require('mysql')

        var connection = mysql.createConnection({
            host: "gtizpe105piw2gfq.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",

            // Your port; if not 3306
            port:3306,

            // Your username
            user: "hbj13fdjgl5gdjky",

            // Your password
            password: "nfer3mqxygj3hxry",
            database: "hrhqkjdyq4hklig9"

        });
        connection.connect(function (err) {
            if (err) throw err;
            

        });
        
        connection.query('INSERT INTO products SET ?',[{stock_quantity: parseInt(inputs.quantity),
            department_name: inputs.department,
            price: parseInt(inputs.price),
            product_name: inputs.item}],
            function (err, res){
                console.log(err)
            response.send(res)
        })


    })
    
    
    
    ;

}
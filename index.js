// Dependencies
// =============================================================
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 5000;

  


// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.static('routes'));

require("./routes/apiRoutes")(app);


// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/inventory", function (req, res) {
  res.sendFile(path.join(__dirname, "inventory.html"));
});

app.get("/admin", function (req, res) {
  res.sendFile(path.join(__dirname, "admin.html"));
});

app.get("/adminView", function (req, res) {
  res.sendFile(path.join(__dirname, "adminView.html"));
});







// Starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});

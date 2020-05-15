const express = require('express');
const exphbs = require('express-handlebars');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const config = require("./config/connection");
const app = express();
app.use(express.static('public'))
// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;
const dbConfig = (process.env.NODE_ENV === "production") ? config.heroku : config.db

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(express.urlencoded({ extenede: true }))
app.use(express.json())

const connection = mysql.createConnection(dbConfig);
connection.connect(function(err){
  if (err) {
    console.err("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

app.get('/', function (req, res) {
  connection.query("SELECT * FROM burgers;", function(err, data) {
    if (err) throw err;
   
    res.render('index', {burgers: data});
  })
})

app.post('/api/burger', function (req, res) {

  console.log(req.body)
  burger.create(['name', 'devoured'  ],
   [req.body.name, req.body.Burgers ], function (result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId })
  })
})
app.listen(PORT, function() {
    // Log (server-side) when our server has started
    console.log("Server listening on: http://localhost:" + PORT);
  });
  
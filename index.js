const mysql = require('mysql');
const express = require('express');
const bodyParser = require('body-parser');
const encoder = bodyParser.urlencoded();

const app = express();

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Re5hma@26123',
  database: 'project',
});

connection.connect(function (error) {
  if (error) throw error;
  else console.log('Connected to DB');
});
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/App.js');
});
app.post('/', encoder, function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  connection.query(
    'select * from project.login where email=? and pass=?',
    [username, password],
    function (error, results, fields) {
      if (results.length > 0) {
        res.redirect('..src/pages/home.jsx');
      } else {
        res.redirect('/');
      }
      res.end();
    }
  );
});

app.get('..src/pages/home', function (req, res) {
  res.sendFile(__dirname + '..src/pages/home.jsx');
});

app.listen(4000);

var express = require('express');
var bodyParser = require('body-parser');
var sqlite3 = require('sqlite3');
var app = express();
var db = new sqlite3.Database('quotes.db');
var port = 3000;

app.listen(port, function() {
    console.log('Express app listening on port: ' + port);
});

app.get('/', function(request, response) {
    response.send("Get request received at '/'");
});

app.get('/quotes', function(request, response) {
    if (request.query.year) {
        db.all('SELECT * FROM Quotes WHERE year = ?', [request.query.year], function(error, rows) {
            // catch any runtime error 
            if(error) {
                console.log('ERROR: ' + error.message);
            } else {
                console.log('Return a list of quotes from the year: ' + request.query.year);
                response.json(rows);
            }
        });
    } else {
        db.all('SELECT * FROM Quotes', function(error, rows) {
            if (error) {
                console.log('ERROR: ' + error.message);
            } else {
                console.log('Return a list of all quotes.');
                response.json(rows);
            }});
    }
});

app.get('/quotes/:id', function(request, response) {
    console.log('Return quote with the ID: ' + request.params.id);
    response.send('Return quote with the id: ' + request.params.id);
});

app.use(bodyParser.urlencoded({ extended: true})); 

app.post('/quotes', function(request, response) {
    console.log("Insert a new quote: " + request.body.quote);
    response.json(request.body);
});


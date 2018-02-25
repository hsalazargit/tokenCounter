const express       = require('express');
const MongoClient   = require('mongodb').MongoClient;
const bodyParser    = require('body-parser');
const db            = require('./config/db');
const app           = express();

// port to listent to
const port = 8000;

app.use(bodyParser.urlencoded({ extend: true }));

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err);

    // add this if on MongoDB 3.0+
    // db = database.db("tokencounterdb");
    // require('./app/routes')(app, db);

    // register routes
    require('./app/routes')(app, database);
    

    // start up server
    app.listen(port, () => {
        console.log('Listening on port: ' + port);
    });
});



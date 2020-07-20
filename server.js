/*
    1) start up mongo db
        "C:\Program Files\MongoDB\Server\3.6\bin\mongod.exe"

    2) Connect to mongo db
        "C:\Program Files\MongoDB\Server\3.6\bin\mongo.exe"
*/

//BASE IMPORTS
const express = require('express');
const app = express();
const util = require('util');          //For debugging

const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

/*****************************
       CHAT SETUP
***************************/
//ENUM
var Action = {
  BROADCAST : "BROADCAST"
}

//CHAT IMPORT
const http = require('http');

//Attach socket.io
var server = http.createServer(app);
app.set('server', server);


/***************************************
  Remaining MEAN Configuration + Setup
****************************************/

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
// app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'dist/covid-tracker/'))); //<- it will automatically search for index.html under src folder.

//enable cors
app.use(cors());

// Send all other requests to the Angular app
app.get('/', (req, res) => {
    // res.sendFile(path.join(path.join(__dirname, 'dist/mean/'), 'index.html'));
    res.sendFile(path.join(__dirname, 'index.html'));
});

//Set Port
const port = process.env.PORT || '3000';
app.set('port', port);

server.listen(port, () => console.log(`Running on localhost:${port}`));

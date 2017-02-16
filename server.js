"use strict";
var express = require("express");
var path_1 = require("path");
var bodyParser = require("body-parser");
var api_1 = require("./server/routes/api");
var app = express();
// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// Point static path to dist
app.use(express.static(path_1.join(__dirname, './dist')));
// Set our api routes
app.use('/api', api_1.api);
// Catch all other routes and return the index file
app.get('*', function (req, res) {
    res.sendFile(path_1.join(__dirname, './dist/index.html'));
});
/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || '3000';
app.set('port', port);
app.listen(port, function () { return console.log("API running on localhost:" + port); });

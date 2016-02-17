/**
 * api.js
 * Returns the api that will be used to create the HTTP server
 */
'use strict';

var express = require('express');
var api = express();
var bodyParser = require('body-parser');
var cors = require('cors');

// Add middleware to enable CORS
api.use(cors());

api.locals.base = '/api/v1';

// Add middleware to parse the POST data of the body
api.use(bodyParser.urlencoded({extended: true}));

// Add middleware to parse application/json
api.use(bodyParser.json());

//CORS middleware
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    // res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    // res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
api.use(allowCrossDomain);

// Serve static content from the public directory
api.use('/', express.static(__dirname + '/../../public', {headers: allowCrossDomain}));

// Add API routes
require('./stub.resource').addRoutes(api);

module.exports = api;
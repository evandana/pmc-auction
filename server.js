// const express = require('express');
// const path = require('path');
// const app = express();

// app.use(express.static(path.join(__dirname, 'build')));

// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

// app.listen(9000);
















// var express = require('express');
// var path = require('path');
// var httpProxy = require('http-proxy');

// var proxy = httpProxy.createProxyServer();
// var app = express();


// // ----- PROD --------------------------------
// // setting this to production since dev doesn't use this flow
// // process.env.NODE_ENV = 'production';
// process.env.PORT = 3000
// // -------------------------------------------

// // for some reason process.env.NODE_ENV is always wrong
// //var isProduction = process.env.NODE_ENV === 'production';
// var isProduction = true;
// var port = isProduction ? process.env.PORT : 3000;
// var publicPath = path.resolve(__dirname, 'public');

// app.use(express.static(publicPath));

// // We only want to run the workflow when not in production
// if (!isProduction) {

//   // We require the bundler inside the if block because
//   // it is only needed in a development environment. Later
//   // you will see why this is a good idea
//   var bundle = require('./server/bundle.js');
//   bundle();

//   // Any requests to localhost:3000/build is proxied
//   // to webpack-dev-server
//   app.all('/build/*', function (req, res) {
//     proxy.web(req, res, {
//         target: 'http://localhost:8080'
//     });
//   });

// }


// // //For avoidong Heroku $PORT error
// // app.get('/', function(request, response) {
// //     var result = 'App is running'
// //     response.send(result);
// // }).listen(app.get('port'), function() {
// //     console.log('App is running, server is listening on port ', app.get('port'));
// // });

// // It is important to catch any errors from the proxy or the
// // server will crash. An example of this is connecting to the
// // server when webpack is bundling
// proxy.on('error', function(e) {
//   console.log('Could not connect to proxy, please try again...');
// });

// app.listen(port, function () {
//   console.log('Server running on port ' + port);
// });
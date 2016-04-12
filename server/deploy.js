// We basically just create a child process that will run
// the production bundle command
var child_process = require('child_process');
child_process.exec("webpack --config webpack.production.config.js --colors", function (error, stdout, stderr) {
  console.log('stdout: ' + stdout);
  console.log('stderr: ' + stderr);
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});

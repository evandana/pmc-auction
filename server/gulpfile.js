'use strict';

var args = require('yargs').argv;
var config = require('./gulp.config')();
var gulp = require('gulp');
var $ = require('gulp-load-plugins')({
    lazy: true
});
var child_process = require('child_process');

// port defined in the environment takes precedence over the default port
var port = process.env.PORT || config.defaultPort;

/**
 * yargs variables can be passed on the command line to alter the behavior.
 * For example
 *     gulp vet --verbose
 * will print the names of files that are in the pipe
 */

/**
 * List the available gulp tasks
 */
gulp.task('help', $.taskListing);
gulp.task('default', ['serve']);



/**
 * Start the server
 * --debug-brk or --debug
 */
gulp.task('serve', function() {
    var debug = args.debug || args.debugBrk;
    var exec;
    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port
        },
        watch: [config.server]
    };

    if (debug) {
        log('Running node-inspector. Browse to http://localhost:8080/debug?port=5858');
        exec = require('child_process').exec;
        exec('node-inspector');
        nodeOptions.nodeArgs = ['--debug=5858'];
    }

    return $.nodemon(nodeOptions)
        .on('restart', ['vet'], function(ev) {
            log('*** nodemon restarted');
            log('files changed:\n' + ev);
        })
        .on('start', function() {
            log('*** nodemon started');
        })
        .on('crash', function() {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function() {
            log('*** nodemon exited cleanly');
        });
});


/**
 * Log a message or series of messages using chalk's blue color.
 * Can pass in a string, object or array.
 */
function log(msg) {
    if (typeof msg === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                console.log(msg[item]);
                //$.util.log($.util.colors.blue(msg[item]));
            }
        }
    }
    else {
        console.log(msg);
        //$.util.log($.util.colors.blue(msg));
    }
}

module.exports = gulp;
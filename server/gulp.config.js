'use strict';

module.exports = function() {
    var root = './';
    var server = './server/';
    
    var config = {
        alljs: [
            root + '*.js',
            server + '**/*.js'
        ],
        root: root,
        server: server,

        /* ----- Node settings ----- */
        nodeServer: server + 'server.js',
        defaultPort: '8080'
    };

    return config;
};
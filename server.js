var cluster = require('cluster');
var config = require('./config/application.js');
var watcher = require('./lib/watcher');
var logger = require('./lib/logger');

process.title = config.name + ".master.node";

if (cluster.isMaster) {
    cluster.workers = {};
    console.out('Master ' + process.pid + ' running', 'server#master');
    for (var i = 0; i < config.workers; i++) {
        var worker = cluster.fork();
        cluster.workers[worker.pid] = worker;
    }

    cluster.on('death', function(worker) {
        delete cluster.workers[worker.pid];
        console.out('Worker ' + worker.pid + ' died.  Restarting...', 'server#master');
        var worker = cluster.fork();
        cluster.workers[worker.pid] = worker;
    });

    watcher(__dirname);
} else {
    process.title = config.name + ".worker.node";
    console.out('Worker ' + process.pid + ' alive', 'server#worker');

    var application = require('./app');
    application.listen(config.port);
}
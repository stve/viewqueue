var config = require('../config/application.js');
var colorize = require('colorize');

console.out = function(data, location, req) {
    var now = new Date().toLocaleString();
    if(config.debug) colorize.console.log("#green[%s]\t#blue[%s]\t%s", now, location, data);
}
function config() {
    var config;
    var env = process.env.NODE_ENV || 'development';
    config = require('./env/' + env + '.config')
    return config;
}
module.exports = config();
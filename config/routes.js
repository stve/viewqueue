var config = require('../config/application');
var phantom = require('phantom');
var fs = require('fs');
var qs = require('querystring');

var init = function(app) {
    app.get('/', function(req, res) {
      res.send('ohai');
    });

    app.get('/screenshot', function(req, res) {
      var url = req.param('url') || res.end('No url parameter found.', 400);
      var filename = 'tmp/screenshot.png'

      phantom.create(function(ph) {
        ph.createPage(function(page) {
          page.open(url, function (status) {
            page.render(filename, function() {
              fs.readFile(filename, function (err, data) {
                if (err) throw err;

                res.end(data);
              });

              ph.exit();
            });
          });
        });
      });
    });
}
module.exports.init = init;
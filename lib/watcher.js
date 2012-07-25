var fs = require('fs');
var basename = require('path').basename
var extname = require('path').extname;

// traverse file if it is a directory
// otherwise setup the watcher
var cluster = require('cluster');

function traverse(file) {
  var file = resolve(file);
  fs.stat(file, function(err, stat){
    if (!err) {
      if (stat.isDirectory()) {
        if (~['node_modules', 'support', 'test', 'bin'].indexOf(basename(file))) return;
        fs.readdir(file, function(err, files){
          files.map(function(f){
            return file + '/' + f;
          }).forEach(traverse);
        });
      } else {
        watch(file);
      }
    }
  });
}

// watch file for changes
function watch(file) {
  fs.watchFile(file, { interval: 100 }, function(curr, prev){
    if (curr.mtime > prev.mtime) {
      console.out(file + ' changed.  Restarting...', 'server#master');
      for(worker in cluster.workers) {
            cluster.workers[worker].kill();
        }
    }
  });
}

function resolve(path){
  return '/' == path[0]
    ? path
    : __dirname + '/' + path;
};

module.exports = traverse;
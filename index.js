// Generated by CoffeeScript 1.10.0
(function() {
  var exec, fs;

  exec = require("child_process").exec;

  fs = require("fs");

  module.exports = function(what) {
    var out, tmp;
    tmp = "./tmp_" + Math.floor(Math.random() * 1000000000);
    out = fs.createWriteStream(tmp + ".coffee");
    return what({
      inline: function(zeug) {
        return out.write(zeug.split("/").pop().replace("\.", "") + " = \"\"\"\n" + fs.readFileSync("./" + zeug) + "\n\"\"\"\n");
      },
      append: function(file) {
        return out.write(fs.readFileSync(file));
      },
      browserify: function(f, opt) {
        return exec("./node_modules/coffee-script/bin/coffee -c " + tmp + ".coffee", function(e, o) {
          var b, browserify;
          browserify = require('browserify');
          b = browserify({
            debug: true
          });
          if (opt && (opt.mini || opt.minify)) {
            b.plugin('minifyify', {
              map: 'bundle.js.map'
            });
          }
          if (opt && opt.include) {
            b.add(opt.include);
          }
          b.add(tmp + ".js");
          return b.bundle(function(err, code, map) {
            var i;
            if (err) {
              console.log(err);
            }
            i = fs.createWriteStream(f);
            i.write(code);
            return exec("rm " + tmp + ".*");
          });
        });
      }
    });
  };

}).call(this);
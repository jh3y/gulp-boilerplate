var gulp      = require('gulp'),
  browsersync = require('browser-sync'),
  vss         = require('vinyl-source-stream'),
  vb          = require('vinyl-buffer'),
  vf          = require('vinyl-file'),
  gConfig      = require('../gulp-config'),
  opts        = gConfig.pluginOpts,
  src         = gConfig.paths.sources,
  dest        = gConfig.paths.destinations;

/**
  * creates local static livereload server using browsersync
*/
var start = function() {
  var server = browsersync.create();
  server.init(opts.browserSync);
  return server.watch(src.overwatch, function(evt, file) {
    if (evt === 'change' && file.indexOf('.css') === -1)
      server.reload();
    if (evt === 'change' && file.indexOf('.css') !== -1)
      vf.readSync(file)
        .pipe(vss(file))
        .pipe(vb())
        .pipe(server.stream())
  })
}
start.description = `creates a Browsersync instance that serves content from ${opts.browserSync.server.baseDir} providing live reload and style injection`

module.exports = {
  start: start,
}

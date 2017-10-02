var gulp  = require('gulp'),
  gConfig  = require('../gulp-config'),
  src     = gConfig.paths.sources,
  opts    = gConfig.pluginOpts,
  plugins = require('gulp-load-plugins')(opts.load);

/* deploy */
var run = function() {
  return gulp.src(src.overwatch)
    .pipe(plugins.deploy())
}
run.description = `Deploy output from ${src.overwatch} to gh-pages branch on GitHub`

module.exports = {
  run: run,
}

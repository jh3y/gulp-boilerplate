var gulp      = require('gulp'),
  gConfig     = require('../gulp-config'),
  keys        = require('../gulp-keys'),
  utils       = require('./utils'),
  opts        = gConfig.pluginOpts,
  env         = utils.getEnv(),
  src         = gConfig.paths.sources,
  dest        = gConfig.paths.destinations,
  plugins     = require('gulp-load-plugins')(opts.load),
  /* markup:lint */
  lint = function() {
    return gulp.src(src.markup)
      .pipe(plugins.pugLint());
  },
  /* markup:compile */
  compile = function() {
    if (env.deploy && opts.pug.pretty) opts.pug.pretty = false;
    return gulp.src(src.docs)
      .pipe(plugins.plumber())
      .pipe(plugins.pug(opts.pug))
      .pipe(gulp.dest(dest.html));
  },
  /* markup:watch */
  watch = function() {
    gulp.watch(src.markup, [keys.compile_markup]);
  };

module.exports = {
  lint   : lint,
  compile: compile,
  watch  : watch
};

var gulp  = require('gulp'),
  gConfig  = require('../gulp-config'),
  keys    = require('../gulp-keys'),
  utils   = require('./utils'),
  opts    = gConfig.pluginOpts,
  env     = utils.getEnv(),
  src     = gConfig.paths.sources,
  dest    = gConfig.paths.destinations,
  plugins = require('gulp-load-plugins')(opts.load);

/* markup:lint */
var lint = function() {
  return gulp.src(src.markup)
    .pipe(plugins.pugLint())
}
lint.description = `lint markup source(${src.markup}) using pug-lint`

/* markup:compile */
var compile = function() {
  if (env.deploy && opts.pug.pretty) opts.pug.pretty = false
  return gulp.src(src.docs)
    .pipe(plugins.plumber())
    .pipe(plugins.pug(opts.pug))
    .pipe(gulp.dest(dest.html))
}
compile.description = `compile markup source(${src.markup}) using pug`
compile.flags = {
  '--deploy': 'Turns off pretty option in pug and removes whitespace from output'
}
/* markup:watch */
var watch = function() {
  gulp.watch(src.markup, [keys.compile_markup])
};
watch.description = `watch for changes in markup source(${src.markup}) and compile on change`

module.exports = {
  lint   : lint,
  compile: compile,
  watch  : watch,
}

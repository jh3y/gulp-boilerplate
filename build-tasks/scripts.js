var gulp  = require('gulp'),
  gConfig  = require('../gulp-config'),
  keys    = require('../gulp-keys'),
  utils   = require('./utils'),
  opts    = gConfig.pluginOpts,
  env     = utils.getEnv(),
  src     = gConfig.paths.sources,
  dest    = gConfig.paths.destinations,
  plugins = require('gulp-load-plugins')(opts.load);

/* scripts:lint */
var lint = function() {
  return gulp.src(src.scripts)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
}
lint.description = `lint script source(${src.scripts}) using eslint`

/* scripts:compile */
var compile = function() {
  return gulp.src(src.scripts)
    .pipe(plugins.plumber())
    .pipe(plugins.babel(opts.babel))
    .pipe(env.mapped ? gulp.dest(dest.js): plugins.gUtil.noop())
    .pipe(env.mapped ? plugins.sourcemaps.init(): plugins.gUtil.noop())
    .pipe(plugins.concat(gConfig.pkg.name + '.js'))
    .pipe(plugins.wrap(opts.wrap))
    .pipe(env.stat ? plugins.size(opts.gSize): plugins.gUtil.noop())
    .pipe(env.deploy ? plugins.gUtil.noop(): gulp.dest(env.dist ? dest.dist: dest.js))
    .pipe(plugins.uglify())
    .pipe(plugins.rename(opts.rename))
    .pipe(env.mapped ? plugins.sourcemaps.write('./'): plugins.gUtil.noop())
    .pipe(env.stat ? plugins.size(opts.gSize): plugins.gUtil.noop())
    .pipe(gulp.dest(env.dist ? dest.dist: dest.js))
}
compile.description = `compile script source(${src.scripts}) using babel before concatenating and safety wrapping output`
compile.flags = {
  '--mapped': 'create source maps for scripts',
  '--stat': 'output script size statistics for output',
  '--deploy': `minify scripts output for deployment from ${dest.js}`,
  '--dist': `produce both un-minified and minified output for ${dest.dist} folder`,
}

/* scripts:watch */
var watch = function() {
  gulp.watch(src.scripts, [keys.compile_scripts])
}
watch.description = `watch for script source(${src.scripts}) changes and compile on change`

module.exports = {
  lint   : lint,
  compile: compile,
  watch  : watch,
}

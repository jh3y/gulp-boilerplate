var gulp  = require('gulp'),
  gConfig  = require('../gulp-config'),
  keys    = require('../gulp-keys'),
  utils   = require('./utils'),
  opts    = gConfig.pluginOpts,
  env     = utils.getEnv(),
  src     = gConfig.paths.sources,
  dest    = gConfig.paths.destinations,
  plugins = require('gulp-load-plugins')(opts.load);

/* styles:lint */
var lint = function() {
  return gulp.src(src.styles)
    .pipe(plugins.stylint(opts.stylint))
    .pipe(plugins.stylint.reporter())
}

/* styles:compile */
var compile = function() {
  return gulp.src(src.styles)
    .pipe(plugins.plumber())
    .pipe(plugins.concat(gConfig.pkg.name + '.stylus'))
    .pipe(plugins.stylus())
    .pipe(plugins.prefix(opts.prefix))
    .pipe(env.stat ? plugins.size(opts.gSize): plugins.gUtil.noop())
    .pipe(env.deploy ? plugins.gUtil.noop(): gulp.dest(env.dist ? dest.dist: dest.css))
    .pipe(plugins.minify())
    .pipe(plugins.rename(opts.rename))
    .pipe(env.stat ? plugins.size(opts.gSize): plugins.gUtil.noop())
    .pipe(gulp.dest(env.dist ? dest.dist: dest.css))
}
compile.description = `concatenate and compile style source(${src.styles}) using stylus before autoprefixing and minifying`
compile.flags = {
  '--stat': 'output sizing statistics for compilation output',
  '--deploy': `only create minified output in the deployment directory ${dest.css}`,
  '--dist': `output both un-minified and minified styles to dist directory(${dest.dist})`,
}

/* styles:watch */
var watch = function() {
  gulp.watch(src.styles, [keys.compile_styles])
}
watch.description = `watch for style source(${src.styles}) changes and compile on change`

module.exports = {
  lint   : lint,
  compile: compile,
  watch  : watch,
}

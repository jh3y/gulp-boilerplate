var gulp  = require('gulp'),
  gConfig  = require('../gulp-config'),
  utils   = require('./utils'),
  opts    = gConfig.pluginOpts,
  env     = utils.getEnv(),
  src     = gConfig.paths.sources,
  dest    = gConfig.paths.destinations,
  plugins = require('gulp-load-plugins')(opts.load);

/* TODO: populate linting */
var lint = function() {}
/* TODO: lint description */
lint.description = ``
/* TODO: lint flags */
lint.flags = {}
/* TODO: populate compilation task */
var compile = function() {}
/* TODO: compile description */
compile.description = ``
/* TODO: compile flags */
compile.flags = {}
/* TODO: populate watching task */
var watch = function() {}
/* TODO: watch description */
watch.description = ``
/* TODO: watch flags */
watch.flags = {}

module.exports = {
  lint   : lint,
  compile: compile,
  watch  : watch,
}

var keyMirror = require('key-mirror')

var TASK_NAMES = keyMirror({
  serve: null,
  deploy: null,
  compile: null,
  compile_scripts: null,
  compile_markup: null,
  compile_styles: null,
  lint: null,
  lint_scripts: null,
  lint_markup: null,
  lint_styles: null,
  watch: null,
  watch_scripts: null,
  watch_markup: null,
  watch_styles: null,
})

module.exports = TASK_NAMES

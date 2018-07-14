import gulp from 'gulp'

import {
  compileScripts,
  lintScripts,
  watchScripts,
} from './scripts'

import {
  compileStyles,
  lintStyles,
  watchStyles,
} from './styles'

import {
  compileMarkup,
  watchMarkup,
} from './markup'

const lint = gulp.parallel(lintStyles, lintScripts)
lint.description = 'lint all source'

const compile = gulp.parallel(compileMarkup, compileStyles, compileScripts)
compile.description = 'compile all source'

const watch = gulp.parallel(watchMarkup, watchStyles, watchScripts)
watch.description = 'watch for changes to all source'

export {
  compile,
  lint,
  watch,
}
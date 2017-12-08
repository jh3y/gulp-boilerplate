import gulp from 'gulp'
import gutil from 'gulp-util'

import {
  compileScripts,
  lintScripts,
  watchScripts,
} from './build-tasks/scripts'
import { compileStyles, lintStyles, watchStyles } from './build-tasks/styles'
import { compileMarkup, lintMarkup, watchMarkup } from './build-tasks/markup'

import { compile, lint, watch as watchEverything } from './build-tasks/main'
import { deploy } from './build-tasks/deploy'
import { stat } from './build-tasks/stat'
import { serve as serveEverything } from './build-tasks/server'

export {
  deploy,
  serveEverything as serve,
  stat,
  compile,
  lint,
  watchEverything as watch,
  compileScripts,
  compileMarkup,
  compileStyles,
  lintScripts,
  lintStyles,
  lintMarkup,
  watchScripts,
  watchStyles,
  watchMarkup,
}

const serve = (cb) => serveEverything(cb)
const watch = (cb) => watchEverything(cb)
const defaultTasks = gutil.env.deploy
  ? gulp.series(deploy)
  : gulp.parallel(
      serve,
      watch,
    )

export default defaultTasks

import gulp from 'gulp'
import gutil from 'gulp-util'
import keys from './gulp-keys'
import server from './build-tasks/server'
import scripts from './build-tasks/scripts'
import styles from './build-tasks/styles'
import markup from './build-tasks/markup'
import deploy from './build-tasks/deploy'
import stat from './build-tasks/stat'

gulp.task(keys.lint_scripts, scripts.lint)
gulp.task(keys.compile_scripts, scripts.compile)
gulp.task(keys.watch_scripts, scripts.watch)

gulp.task(keys.lint_styles, styles.lint)
gulp.task(keys.compile_styles, styles.compile)
gulp.task(keys.watch_styles, styles.watch)

gulp.task(keys.lint_markup, markup.lint)
gulp.task(keys.compile_markup, markup.compile)
gulp.task(keys.watch_markup, markup.watch)

gulp.task(
  keys.lint,
  gulp.parallel(keys.lint_markup, keys.lint_styles, keys.lint_scripts)
)

gulp.task(
  keys.compile,
  gulp.parallel(keys.compile_markup, keys.compile_styles, keys.compile_scripts)
)

gulp.task(
  keys.watch,
  gulp.parallel(keys.watch_markup, keys.watch_styles, keys.watch_scripts)
)

gulp.task(keys.serve, server.start)
gulp.task(keys.deploy, deploy.run)
gulp.task(keys.stat, stat.run)

const defaultTasks = gutil.env.deploy
  ? gulp.series(keys.deploy)
  : gulp.parallel(keys.serve, keys.watch)

gulp.task('default', defaultTasks)

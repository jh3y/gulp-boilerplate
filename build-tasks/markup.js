import gulp from 'gulp'
import gConfig from '../gulp-config'
import keys from '../gulp-keys'
import { getEnv } from './utils'
import pluginLoader from 'gulp-load-plugins'

const opts = gConfig.pluginOpts
const env = getEnv()
const src = gConfig.paths.sources
const dest = gConfig.paths.destinations
const plugins = pluginLoader(opts.load)

const lint = () => gulp.src(src.markup).pipe(plugins.pugLint())
lint.description = `lint markup source(${src.markup}) using pug-lint`

const compile = () => {
  opts.pug = Object.assign({}, opts.pug, {
    pretty: !(env.deploy && opts.pug.pretty),
    data: Object.assign({}, opts.pug.data, {
      scriptName: `${opts.pug.data.name}${env.deploy ? '.min' : ''}`,
      styleName: `${opts.pug.data.name}${env.deploy ? '.min' : ''}`,
    })
  })
  // Don't do anything if outputting dist files and using compilation task
  if (env.dist) return gulp.src(src.docs).pipe(plugins.gUtil.noop())
  return gulp
    .src(src.docs)
    .pipe(plugins.plumber())
    .pipe(plugins.pug(opts.pug))
    .pipe(gulp.dest(dest.html))
}
compile.description = `compile markup source(${src.markup}) using pug`
compile.flags = {
  '--deploy':
    'Turns off pretty option in pug and removes whitespace from output',
}

const watch = () => gulp.watch(src.markup, gulp.series(keys.lint_markup, keys.compile_markup))
watch.description = `watch for changes in markup source(${src.markup}) and lint then compile on change`

module.exports = {
  compile,
  lint,
  watch,
}

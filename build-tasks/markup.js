import gulp from 'gulp'
import gConfig from '../gulp-config'
import { getEnv } from './utils'
import pluginLoader from 'gulp-load-plugins'
import { obj as noop } from 'through2'

const opts = gConfig.pluginOpts
const env = getEnv()
const src = gConfig.paths.sources
const dest = gConfig.paths.destinations
const plugins = pluginLoader(opts.load)

const lintMarkup = () => gulp.src(src.markup).pipe(plugins.pugLint())
lintMarkup.description = `lint markup source(${src.markup}) using pug-lint`

const compileMarkup = () => {
  opts.pug = Object.assign({}, opts.pug, {
    pretty: !(env.deploy && opts.pug.pretty),
    data: Object.assign({}, opts.pug.data, {
      scriptName: `${opts.pug.data.name}${env.deploy ? '.min' : ''}`,
      styleName: `${opts.pug.data.name}${env.deploy ? '.min' : ''}`,
    })
  })
  // Don't do anything if outputting dist files and using compilation task
  if (env.dist) return gulp.src(src.docs).pipe(noop())
  return gulp
    .src(src.docs)
    .pipe(plugins.plumber())
    .pipe(plugins.pug(opts.pug))
    .pipe(gulp.dest(dest.html))
}
compileMarkup.description = `compile markup source(${src.markup}) using pug`
compileMarkup.flags = {
  '--deploy':
    'Turns off pretty option in pug and removes whitespace from output',
}

const watchMarkup = () => gulp.watch(src.markup, gulp.series(lintMarkup, compileMarkup))
watchMarkup.description = `watch for changes in markup source(${src.markup}) and lint then compile on change`

export {
  compileMarkup,
  lintMarkup,
  watchMarkup,
}

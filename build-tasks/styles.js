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
const lintStyles = () =>
  gulp
    .src(src.styles.all)
    .pipe(plugins.stylint(opts.stylint))
    .pipe(plugins.stylint.reporter())
lintStyles.description = `lint style source(${src.styles.all}) using stylint`

const compileStyles = () =>
  gulp
    .src(src.styles.root)
    .pipe(plugins.plumber())
    .pipe(plugins.concat(gConfig.pkg.name + '.styl'))
    .pipe(plugins.stylus())
    .pipe(plugins.prefix(opts.prefix))
    .pipe(
      env.deploy
        ? noop()
        : gulp.dest(dest.css)
    )
    .pipe(env.deploy || env.dist ? plugins.minify() : noop())
    .pipe(
      env.deploy || env.dist
        ? plugins.rename(opts.rename)
        : noop()
    )
    .pipe(
      env.deploy || env.dist
        ? gulp.dest(dest.css)
        : noop()
    )
compileStyles.description = `concatenate and compile style source(${src.styles.all}) using stylus before autoprefixing and minifying`
compileStyles.flags = {
  '--deploy': `only create minified output in the deployment directory ${dest.css}`,
  '--dist': `output both un-minified and minified styles to dist directory`,
}

const watchStyles = () =>
  gulp.watch(src.styles.all, gulp.series(lintStyles, compileStyles))
watchStyles.description = `watch for style source(${src.styles.all}) changes and lint then compile on change`

export {
  compileStyles,
  lintStyles,
  watchStyles,
}

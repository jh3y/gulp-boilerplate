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

const lint = () =>
  gulp
    .src(src.styles.all)
    .pipe(plugins.stylint(opts.stylint))
    .pipe(plugins.stylint.reporter())
lint.description = `lint style source(${src.styles.all}) using stylint`

const compile = () =>
  gulp
    .src(src.styles.root)
    .pipe(plugins.plumber())
    .pipe(plugins.concat(gConfig.pkg.name + '.styl'))
    .pipe(plugins.stylus())
    .pipe(plugins.prefix(opts.prefix))
    .pipe(
      env.deploy
        ? plugins.gUtil.noop()
        : gulp.dest(dest.css)
    )
    .pipe(env.deploy || env.dist ? plugins.minify() : plugins.gUtil.noop())
    .pipe(
      env.deploy || env.dist
        ? plugins.rename(opts.rename)
        : plugins.gUtil.noop()
    )
    .pipe(
      env.deploy || env.dist
        ? gulp.dest(dest.css)
        : plugins.gUtil.noop()
    )
compile.description = `concatenate and compile style source(${src.styles.all}) using stylus before autoprefixing and minifying`
compile.flags = {
  '--deploy': `only create minified output in the deployment directory ${dest.css}`,
  '--dist': `output both un-minified and minified styles to dist directory`,
}

const watch = () =>
  gulp.watch(src.styles.all, gulp.series(keys.lint_styles, keys.compile_styles))
watch.description = `watch for style source(${src.styles.all}) changes and lint then compile on change`

export default {
  compile,
  lint,
  watch,
}

import gulp from 'gulp'
import keys from '../gulp-keys'
import gConfig from '../gulp-config'
import pluginLoader from 'gulp-load-plugins'

const src = gConfig.paths.sources
const opts = gConfig.pluginOpts
const plugins = pluginLoader(opts.load)

const deploySource = () => gulp.src(src.overwatch).pipe(plugins.deploy())

const run = (cb) => gulp.series(keys.compile, deploySource)(cb)
run.description = `Deploy production ready assets from ${gConfig.paths.base} to gh-pages branch on GitHub`

module.exports = {
  run
}

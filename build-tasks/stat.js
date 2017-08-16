import gulp from'gulp'
import gConfig from '../gulp-config'
import pluginLoader from 'gulp-load-plugins'

const opts = gConfig.pluginOpts
const plugins= pluginLoader(opts.load)

const run = () => {
  return gulp
    .src(`${gConfig.paths.base}/**/*.*`)
    .pipe(plugins.size(opts.gSize))
}
run.description = `show sizing statistics for output files in current output directory, default being ${gConfig.paths.base}`
run.flags = {
  '--dist': 'show dist file sizes in the dist directory'
}

module.exports = {
  run
}

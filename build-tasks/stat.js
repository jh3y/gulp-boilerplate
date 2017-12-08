import gulp from 'gulp'
import gConfig from '../gulp-config'
import pluginLoader from 'gulp-load-plugins'

const opts = gConfig.pluginOpts
const plugins = pluginLoader(opts.load)

const stat = () => gulp.src(`${gConfig.paths.base}/**/*.*`).pipe(plugins.size(opts.gSize))

stat.description = `show sizing statistics for output files in current output directory, default being ${gConfig.paths.base}`
stat.flags = {
  '--dist': 'show dist file sizes in the dist directory',
}

export { stat }

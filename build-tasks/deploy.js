import gulp from 'gulp'
import gConfig from '../gulp-config'
import pluginLoader from 'gulp-load-plugins'
import { compile as compileAllSource } from './main'

const src = gConfig.paths.sources
const opts = gConfig.pluginOpts
const plugins = pluginLoader(opts.load)

const deploySource = () => gulp.src(src.overwatch).pipe(plugins.deploy())

// NOTE:: This is necessary in order to get more verbose metadata when running gulp -T
const compile = (cb) => compileAllSource(cb)
const deploy = gulp.series(compile, deploySource)
deploy.description = `Compile and deploy production ready assets from ${gConfig.paths.base} to gh-pages branch on GitHub`

export {
  deploy
}

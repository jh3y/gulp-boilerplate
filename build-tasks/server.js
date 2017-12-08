import gulp from 'gulp'
import browsersync from 'browser-sync'
import vss from 'vinyl-source-stream'
import vb from 'vinyl-buffer'
import vf from 'vinyl-file'
import gConfig from '../gulp-config'
import { compile as compileAllSource } from './main'

const opts = gConfig.pluginOpts
const src = gConfig.paths.sources
const dest = gConfig.paths.destinations

/**
  * creates local static livereload server using browsersync
*/
const startServer = () => {
  const server = browsersync.create()
  server.init(opts.browserSync)
  return server.watch(src.overwatch, (evt, file) => {
    if (evt === 'change' && file.indexOf('.css') === -1) server.reload()
    if (evt === 'change' && file.indexOf('.css') !== -1)
      vf
        .readSync(file)
        .pipe(vss(file))
        .pipe(vb())
        .pipe(server.stream())
  })
}
const compile = (cb) => compileAllSource(cb)
const serve = gulp.series(compile, startServer)
serve.description = `creates a Browsersync instance that serves content from ${opts
  .browserSync.server.baseDir} providing live reload and style injection`

export { serve }

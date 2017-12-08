import gulp from'gulp'
import gConfig from '../gulp-config'
import { getEnv } from './utils'
import pluginLoader from 'gulp-load-plugins'

const opts = gConfig.pluginOpts
const env = getEnv()
const src = gConfig.paths.sources
const dest = gConfig.paths.destinations
const plugins= pluginLoader(opts.load)

/* TODO: populate linting */
const lint = () => ()
/* TODO: lint description */
lint.description = ``
/* TODO: lint flags */
lint.flags = {}
/* TODO: populate compilation task */
const compile = () => ()
/* TODO: compile description */
compile.description = ``
/* TODO: compile flags */
compile.flags = {}
/* TODO: populate watching task */
const watch = () => ()
/* TODO: watch description */
watch.description = ``
/* TODO: watch flags */
watch.flags = {}

export {
  lint,
  compile,
  watch,
}

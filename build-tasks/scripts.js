import gulp from 'gulp'
import gConfig from '../gulp-config'
import keys from '../gulp-keys'
import { getEnv } from './utils'
import { rollup } from 'rollup'
import babel from 'rollup-plugin-babel'
import resolve from 'rollup-plugin-node-resolve'
import uglify from 'rollup-plugin-uglify'
import pluginLoader from 'gulp-load-plugins'

const opts = gConfig.pluginOpts
const env = getEnv()
const src = gConfig.paths.sources
const dest = gConfig.paths.destinations
const plugins = pluginLoader(opts.load)

const lint = () => {
  return gulp
    .src(src.scripts.all)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format())
}
lint.description = `lint script source(${src.scripts.all}) using eslint`

const compile = async function() {

  const plugins = [
    resolve(),
    babel({ exclude: 'node_modules/**' }),
  ]

  if (env.mapped || env.deploy) plugins.push(uglify())

  const bundle = await rollup({
    input: src.scripts.root,
    plugins,
  })

  await bundle.write({
    file: `${dest.js}/${gConfig.pkg.name}${env.deploy ? '.min' : ''}.js`,
    format: 'iife',
    name: 'myScripts',
    sourcemap: env.mapped,
  })

  if (env.dist) {
    plugins.push(uglify())
    const bundle = await rollup({
      input: src.scripts.root,
      plugins,
    })
    await bundle.write({
      file: `${dest.js}${gConfig.pkg.name}.min.js`,
      format: 'iife',
      name: 'myScripts',
      sourcemap: true,
    })
  }
}
compile.description = `compile script source(${src.scripts.all}) using babel before concatenating and safety wrapping output`
compile.flags = {
  '--mapped': 'create source maps for scripts',
  '--deploy': `minify scripts output for deployment from ${dest.js}`,
  '--dist': `output both un-minified and minified scripts along with sourcemaps to dist directory`,
}

const watch = () =>
  gulp.watch(src.scripts.all, gulp.series(keys.lint_scripts, keys.compile_scripts))
watch.description = `watch for script source(${src.scripts.all}) changes and lint then compile on change`

module.exports = {
  compile,
  lint,
  watch,
}

import { getEnv } from './build-tasks/utils'

const envVar = getEnv()
const env = envVar.dist ? 'dist/' : 'public/'
const pkg = require('./package.json')

module.exports = {
  pkg: {
    name: pkg.name,
  },
  pluginOpts: {
    browserSync: {
      port: 1987,
      server: {
        baseDir: env,
      },
    },
    gSize: {
      showFiles: true,
    },
    pug: {
      pretty: true,
      data: {
        description: pkg.description,
        name: pkg.name,
        version: pkg.version,
      },
    },
    load: {
      rename: {
        'gulp-gh-pages': 'deploy',
        'gulp-cssnano': 'minify',
        'gulp-autoprefixer': 'prefix',
      },
    },
    prefix: ['last 3 versions', 'Blackberry 10', 'Android 3', 'Android 4'],
    rename: {
      suffix: '.min',
    },
    stylint: {
      reporter: 'stylint-stylish',
    },
  },
  paths: {
    base: env,
    sources: {
      docs: 'src/markup/*.pug',
      markup: 'src/markup/**/*.pug',
      overwatch: env + '**/*.{html,js,css}',
      scripts: {
        root: 'src/script/index.js',
        all: 'src/script/**/*.js',
      },
      styles: {
        root: 'src/style/style.styl',
        all: 'src/style/**/*.styl',
      }
    },
    destinations: {
      css: env + 'css/',
      html: env,
      js: env + 'js/',
    },
  },
}

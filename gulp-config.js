var env = 'public/',
  pkg   = require('./package.json');
module.exports = {
  pkg: {
    name: pkg.name
  },
  pluginOpts: {
    coffee: {
      bare: true
    },
    jade: {
      pretty: true,
      data  : {
        name       : pkg.name,
        description: pkg.description
      }
    },
    gSize: {
      showFiles: true
    },
    browserSync: {
      port   : 1987,
      server : {
        baseDir: env
      }
    },
    prefix: [
      'last 3 versions',
      'Blackberry 10',
      'Android 3',
      'Android 4'
    ],
    wrap: '(function() { <%= contents %> }());',
    load: {
      rename: {
        'gulp-gh-pages'    : 'deploy',
        'gulp-util'        : 'gUtil',
        'gulp-minify-css'  : 'minify',
        'gulp-autoprefixer': 'prefix'
      }
    }
  },
  paths: {
    base: env,
    sources: {
      coffee   : 'src/coffee/**/*.coffee',
      docs     : 'src/jade/*.jade',
      jade     : 'src/jade/**/*.jade',
      stylus   : 'src/stylus/**/*.stylus',
      overwatch: env + '**/*.{html,js,css}'
    },
    destinations: {
      dist: './dist',
      js  : env + 'js/',
      html: env,
      css : env + 'css/'
    }
  }
};

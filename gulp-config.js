var env = 'out/';
module.exports = {
  pkg: {
    name: 'gulp-boilerplate'
  },
  server: {
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
  paths: {
    base: env,
    sources: {
      coffee: 'src/coffee/**/*.coffee',
      docs: 'src/jade/*.jade',
      jade: 'src/jade/**/*.jade',
      stylus: 'src/stylus/**/*.stylus',
      overwatch: 'out/**/*.{html,js,css}'
    },
    destinations: {
      testing: {
        screenshots: './testing/screenshots'
      },
      dist: './dist',
      js: env + 'js/',
      html: env,
      css: env + 'css/'
    }
  }
};

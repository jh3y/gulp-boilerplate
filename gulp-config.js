var env = 'out/';
module.exports = {
  pkg: {
    name: 'gulp-boilerplate'
  },
  paths: {
    sources: {
      coffee: 'src/coffee/**/*.coffee',
      docs: 'src/jade/*.jade',
      jade: 'src/jade/**/*.jade',
      stylus: 'src/stylus/**/*.stylus',
      overwatch: 'out/**/*.{html,js,css}'
    },
    destinations: {
      js: env + 'js/',
      html: env,
      css: env + 'css/'
    }
  }
};

var gulp = require('gulp'),
  gConfig = require('./gulp-config'),
  plugins = require('gulp-load-plugins')({
    rename: {
      'gulp-gh-pages'  : 'deploy',
      'gulp-util'      : 'gUtil',
      'gulp-minify-css': 'minify'
    }
  }),
  isDist       = (plugins.gUtil.env.dist)    ? true: false,
  isDev        = (plugins.gUtil.env.dev)     ? true: false,
  isDeploy     = (plugins.gUtil.env.deploy)  ? true: false,
  sources      = gConfig.paths.sources,
  destinations = gConfig.paths.destinations;

// isDist ? destinations.dist: destinations.js
/* Use this magic to adhere to passed in flags. Means you can pass in flags*/

/*SERVER TASK*/
gulp.task('server:reload', function(event) {
  return gulp.src(sources.overwatch)
    .pipe(plugins.connect.reload());
});
gulp.task('serve', function(event) {
  plugins.connect.server({
    root: destinations.html,
    port: 1987,
    livereload: true
  });
  // sets up a livereload that watches for any changes in the root
  gulp.watch(sources.overwatch, ['server:reload']);
});
/*COFFEE TASK*/
gulp.task('coffee:compile', function(event) {
  return gulp.src(sources.coffee)
    .pipe(plugins.plumber())
    .pipe(plugins.concat('app.coffee'))
    .pipe(plugins.coffee())
    .pipe(gulp.dest(destinations.js))
    .pipe(plugins.uglify())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destinations.js));
});
/*COFFEE WATCH TASK FOR DEVELOPMENT*/
gulp.task('coffee:watch', function(event) {
  gulp.watch(sources.coffee, ['coffee:compile']);
});
/*LESS TASK*/
gulp.task('stylus:compile', function(event) {
  return gulp.src(sources.stylus)
    .pipe(plugins.plumber())
    .pipe(plugins.concat(gConfig.pkg.name + '.stylus'))
    .pipe(plugins.stylus())
    .pipe(gulp.dest(destinations.css))
    .pipe(plugins.minify())
    .pipe(plugins.rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest(destinations.css));
});
/*LESS WATCH TASK FOR DEVELOPMENT*/
gulp.task('stylus:watch', function(event) {
  gulp.watch(sources.stylus, ['stylus:compile']);
});


/*JADE TASK*/
gulp.task('jade:compile', function(event) {
  return gulp.src(sources.docs)
    .pipe(plugins.plumber())
    .pipe(plugins.jade())
    .pipe(gulp.dest(destinations.html));
});
/*JADE WATCH TASK FOR DEVELOPMENT*/
gulp.task('jade:watch', function(event){
  gulp.watch(sources.jade, ['jade:compile']);
});

gulp.task('build:complete', [
  'jade:compile',
  'stylus:compile',
  'coffee:compile'
]);

gulp.task('watch', [
  'jade:watch',
  'stylus:watch',
  'coffee:watch'
]);

/*DEFAULT TASK*/
gulp.task('default', [
  'build:complete',
  'serve',
  'watch'
]);

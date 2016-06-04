var gulp      = require('gulp'),
  gConfig     = require('./gulp-config'),
  browserSync = require('browser-sync'),
  opts        = gConfig.pluginOpts,
  plugins     = require('gulp-load-plugins')(opts.load),
  isDist      = (plugins.gUtil.env.dist)    ? true: false,
  isDev       = (plugins.gUtil.env.dev)     ? true: false,
  isDeploy    = (plugins.gUtil.env.deploy)  ? true: false,
  isMapped    = (plugins.gUtil.env.map)     ? true: false,
  isStat      = (plugins.gUtil.env.stat)    ? true: false,
  src         = gConfig.paths.sources,
  dest        = gConfig.paths.destinations;

/*
  serve; creates local static livereload server using browser-sync.
*/
gulp.task('serve', ['compile'], function(event) {
  browserSync(opts.browserSync);
  return gulp.watch(src.overwatch).on('change', function(file) {
    if (file.path.indexOf('.css') === -1) browserSync.reload();
  });
});

/*
  scripts:compile/scripts:watch

  watch for changes to scriptsScript files then compile app JavaScript file
  from source, concatenating and uglifying content and publishing output based on env flag. For example, if we want sourcemaps we can output our individual JS files and the sourcemap for them to the desired directory by using the --map flag.
*/
gulp.task('scripts:lint', function() {
  return gulp.src(src.scripts)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());
});
gulp.task('scripts:compile', ['scripts:lint'], function(event) {
  return gulp.src(src.scripts)
    .pipe(plugins.plumber())
    .pipe(plugins.babel(opts.babel))
    .pipe(env.mapped ? gulp.dest(dest.js): plugins.gUtil.noop())
    .pipe(env.mapped ? plugins.sourcemaps.init(): plugins.gUtil.noop())
    .pipe(plugins.concat(gConfig.pkg.name + '.js'))
    .pipe(plugins.wrap(opts.wrap))
    .pipe(env.stat ? plugins.size(opts.gSize): plugins.gUtil.noop())
    .pipe(env.deploy ? plugins.gUtil.noop(): gulp.dest(env.dist ? dest.dist: dest.js))
    .pipe(plugins.uglify())
    .pipe(plugins.rename(opts.rename))
    .pipe(env.mapped ? plugins.sourcemaps.write('./'): plugins.gUtil.noop())
    .pipe(env.stat ? plugins.size(opts.gSize): plugins.gUtil.noop())
    .pipe(gulp.dest(env.dist ? dest.dist: dest.js));
});
gulp.task('scripts:watch', function(event) {
  gulp.watch(src.scripts, ['scripts:compile']);
});

/*
  styles:compile/styles:watch

  watch for changes to styles files then compile stylesheet from source
  auto prefixing content and generating output based on env flag.
*/
gulp.task('styles:lint', function() {
  return gulp.src(src.styles)
    .pipe(plugins.stylint(opts.stylint))
    .pipe(plugins.stylint.reporter());
});
gulp.task('styles:compile', ['styles:lint'], function(event) {
  return gulp.src(src.styles)
    .pipe(plugins.plumber())
    .pipe(plugins.concat(gConfig.pkg.name + '.stylus'))
    .pipe(plugins.stylus())
    .pipe(plugins.prefix(opts.prefix))
    .pipe(isStat ? plugins.size(opts.gSize): plugins.gUtil.noop())
    .pipe(isDeploy ? plugins.gUtil.noop(): gulp.dest(isDist ? dest.dist: dest.css))
    .pipe(plugins.minify())
    .pipe(plugins.rename(opts.rename))
    .pipe(isStat ? plugins.size(opts.gSize): plugins.gUtil.noop())
    .pipe(gulp.dest(isDist ? dest.dist: dest.css))
    .pipe(browserSync.stream());
});
gulp.task('styles:watch', function(event) {
  gulp.watch(src.styles, ['styles:compile']);
});

/*
  markup:compile/markup:watch

  watch for all markup file changes then compile
  page document files.
*/
gulp.task('markup:lint', function() {
  return gulp.src(src.markup)
    .pipe(plugins.jadelint());
});
gulp.task('markup:compile', function() {
  return gulp.src(src.docs)
    .pipe(plugins.plumber())
    .pipe(isDeploy ? plugins.jade(): plugins.jade(opts.jade))
    .pipe(gulp.dest(dest.html));
});
gulp.task('markup:watch', function(event){
  gulp.watch(src.markup, ['markup:compile']);
});

gulp.task('deploy', ['compile'], function(event) {
  isDeploy = true;
  return gulp.src(src.overwatch)
    .pipe(plugins.deploy());
});

gulp.task('compile', [
  'markup:compile',
  'styles:compile',
  'scripts:compile'
]);

gulp.task('watch', [
  'markup:watch',
  'styles:watch',
  'scripts:watch'
]);

var defaultTasks = isDeploy ? [
  'deploy'
]:[
  'serve',
  'watch'
];

gulp.task('default', defaultTasks);

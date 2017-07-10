var gulp      = require('gulp'),
  gConfig     = require('./gulp-config'),
  keys        = require('./gulp-keys'),
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
gulp.task(keys.serve, [keys.compile], function(event) {
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
gulp.task(keys.lint_scripts, function() {
  return gulp.src(src.scripts)
    .pipe(plugins.eslint())
    .pipe(plugins.eslint.format());
});
gulp.task(keys.compile_scripts, [keys.lint_scripts], function(event) {
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
gulp.task(keys.watch_scripts, function(event) {
  gulp.watch(src.scripts, [keys.compile_scripts]);
});

/*
  styles:compile/styles:watch

  watch for changes to styles files then compile stylesheet from source
  auto prefixing content and generating output based on env flag.
*/
gulp.task(keys.lint_styles, function() {
  return gulp.src(src.styles)
    .pipe(plugins.stylint(opts.stylint))
    .pipe(plugins.stylint.reporter());
});
gulp.task(keys.compile_styles, [keys.lint_styles], function(event) {
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
gulp.task(keys.watch_styles, function(event) {
  gulp.watch(src.styles, [keys.compile_styles]);
});

/*
  markup:compile/markup:watch

  watch for all markup file changes then compile
  page document files.
*/
gulp.task(keys.lint_markup, function() {
  return gulp.src(src.markup)
    .pipe(plugins.pugLint());
});
gulp.task(keys.compile_markup, [keys.lint_markup], function() {
  return gulp.src(src.docs)
    .pipe(plugins.plumber())
    .pipe(isDeploy ? plugins.pug(): plugins.pug(opts.pug))
    .pipe(gulp.dest(dest.html));
});
gulp.task(keys.watch_markup, function(event){
  gulp.watch(src.markup, [keys.compile_markup]);
});

gulp.task(keys.deploy, [keys.compile], function(event) {
  isDeploy = true;
  return gulp.src(src.overwatch)
    .pipe(plugins.deploy());
});

gulp.task(keys.lint, [
  keys.lint_markup,
  keys.lint_styles,
  keys.lint_scripts
]);

gulp.task(keys.compile, [
  keys.compile_markup,
  keys.compile_styles,
  keys.compile_scripts
]);

gulp.task(keys.watch, [
  keys.watch_markup,
  keys.watch_styles,
  keys.watch_scripts
]);

var defaultTasks = isDeploy ? [
  keys.deploy
]:[
  keys.serve,
  keys.watch
];

gulp.task('default', defaultTasks);

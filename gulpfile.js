var gulp = require('gulp'),
	coffee = require('gulp-coffee'),
	jade = require('gulp-jade'),
	connect = require('gulp-connect'),
	plumber = require('gulp-plumber'),
	less = require('gulp-less'),
	concat = require('gulp-concat'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	minify = require('gulp-minify-css'),
	env = 'out/',
	sources = {
		coffee: 'src/coffee/**/*.coffee',
		docs: 'src/jade/*.jade',
		jade: 'src/jade/**/*.jade',
		less: 'src/less/**/*.less',
		overwatch: 'out/**/*.{html,js,css}'
	},
	destinations = {
		js: env + 'js/',
		html: env,
		css: env + 'css/'
	};
/*SERVER TASK*/
gulp.task('server:reload', function(event) {
	return gulp.src(sources.overwatch)
		.pipe(connect.reload());
});
gulp.task('serve', function(event) {
	connect.server({
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
		.pipe(plumber())
		.pipe(concat('app.coffee'))
		.pipe(coffee())
		.pipe(gulp.dest(destinations.js))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(destinations.js));
});
/*COFFEE WATCH TASK FOR DEVELOPMENT*/
gulp.task('coffee:watch', function(event) {
	gulp.watch(sources.coffee, ['coffee:compile']);
});
/*LESS TASK*/
gulp.task('less:compile', function(event) {
	return gulp.src(sources.less)
		.pipe(plumber())
		.pipe(concat('style.less'))
		.pipe(less())
		.pipe(gulp.dest(destinations.css))
		.pipe(minify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest(destinations.css));
});
/*LESS WATCH TASK FOR DEVELOPMENT*/
gulp.task('less:watch', function(event) {
	gulp.watch(sources.less, ['less:compile']);
});


/*JADE TASK*/
gulp.task('jade:compile', function(event) {
	return gulp.src(sources.docs)
		.pipe(plumber())
		.pipe(jade())
		.pipe(gulp.dest(destinations.html));
});
/*JADE WATCH TASK FOR DEVELOPMENT*/
gulp.task('jade:watch', function(event){
	gulp.watch(sources.jade, ['jade:compile']);
});

gulp.task('build:complete', ['jade:compile', 'less:compile', 'coffee:compile']);

/*DEFAULT TASK*/
gulp.task('default', ['build:complete', "serve", "jade:watch", "less:watch", "coffee:watch"]);

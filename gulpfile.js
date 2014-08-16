var gulp = require('gulp'),
coffee   = require('gulp-coffee'),
jade     = require('gulp-jade'),
connect  = require('gulp-connect'),
plumber  = require('gulp-plumber'),
watch    = require('gulp-watch'),
scss     = require('gulp-sass'),
	sources = {
		coffee: "src/coffee/**/*.coffee",
		templates: ["src/jade/**/*.jade", "!src/jade/*.jade"],
		docs: "src/jade/*.jade",
		scss: "src/scss/**/*.scss",
		style: "src/scss/style.scss",
		overwatch: "out/**/*.*"
	},
	destinations = {
		js: "out/js/",
		docs: "out/",
		css: "out/css/"
	};
/*SERVER TASK*/
gulp.task('serve', function(event) {
	connect.server({
		root: destinations.docs,
		port: 1987,
		livereload: true
	});
	// sets up a livereload that watches for any changes in the root
	watch({glob: sources.overwatch})
		.pipe(connect.reload());
});
/*COFFEE TASK*/
gulp.task('coffee', function(event) {
	return gulp.src(sources.coffee)
		.pipe(plumber())
		.pipe(coffee())
		.pipe(gulp.dest(destinations.js));
});
/*COFFEE WATCH TASK FOR DEVELOPMENT*/
gulp.task('coffee:watch', function(event) {
	watch({glob: sources.coffee})
		.pipe(plumber())
		.pipe(coffee())
		.pipe(gulp.dest(destinations.js));
});
/*SCSS TASK*/
gulp.task("scss", function(event) {
	return gulp.src(sources.style)
		.pipe(plumber())
		.pipe(scss())
		.pipe(gulp.dest(destinations.css));
});
/*SCSS WATCH TASK FOR DEVELOPMENT*/
gulp.task('scss:watch', function(event) {
	watch({glob: sources.scss}, function(files) {
		gulp.src(sources.style)
			.pipe(plumber())
			.pipe(scss())
			.pipe(gulp.dest(destinations.css));
	});
});
/*JADE TASK*/
gulp.task('jade', function(event) {
	return gulp.src(sources.docs)
		.pipe(plumber())
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest(destinations.docs));
});
/*JADE WATCH TASK FOR DEVELOPMENT*/
gulp.task('jade:watch', function(event){
	watch({glob: sources.templates}, function(files) {
		gulp.src(sources.docs)
			.pipe(plumber())
			.pipe(jade({
				pretty: true
			}))
			.pipe(gulp.dest(destinations.docs));
	});
	watch({glob: sources.docs})
		.pipe(plumber())
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest(destinations.docs));
});
/*DEFAULT TASK*/
gulp.task('default', ["serve", "jade:watch", "scss:watch", "coffee:watch"]);
var gulp = require('gulp'),
	coffee = require('gulp-coffee'),
	jade = require('gulp-jade'),
	connect = require('gulp-connect'),
	plumber = require('gulp-plumber'),
	watch = require('gulp-watch'),
	less = require('gulp-less'),
	sources = {
		coffee: "src/coffee/**/*.coffee",
		templates: ["src/jade/**/*.jade", "!src/jade/*.jade"],
		docs: "src/jade/*.jade",
		less: "src/less/**/*.less",
		style: "src/less/style.less",
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
/*LESS TASK*/
gulp.task('less', function(event) {
	return gulp.src(sources.style)
		.pipe(plumber())
		.pipe(less({
			compress: true
		}))
		.pipe(gulp.dest(destinations.css));
});
/*LESS WATCH TASK FOR DEVELOPMENT*/
gulp.task('less:watch', function(event) {
	watch({glob: sources.less}, function(files) {
		gulp.src(sources.style)
			.pipe(plumber())
			.pipe(less({
				compress: true
			}))
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
gulp.task('default', ["serve", "jade:watch", "less:watch", "coffee:watch"]);
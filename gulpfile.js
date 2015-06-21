var gulp = require('gulp'),
	plumber = require('gulp-plumber'),
	sources = {
		js: "src/**/*.js"
	},
	destinations = {
		build: ""
	};
/*BUILD JS*/
gulp.task('js:build', function(event) {
	return gulp.src(sources.js)
		.pipe(plumber())
		.pipe(gulp.dest(destinations.build));
});
/*WATCH JS*/
gulp.task('js:watch', function(event) {
	gulp.watch(sources.js, ["js:build"]);
});
/*DEV TASK*/
gulp.task('dev', ['js:watch']);
/*DEFAULT TASK*/
gulp.task('default', ["dev"]);

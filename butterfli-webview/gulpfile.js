var gulp = require('gulp'),
	browserify = require('browserify'),
	watchify = require('watchify'),
	source = require('vinyl-source-stream'),
	// streamify = require('gulp-streamify'),
	// uglify = require('gulp-uglify'),
	reactify = require('reactify');

gulp.task('watchify', function () {
	var bundler = browserify({
		entries: ['./client/main.jsx'],
		transform: [reactify],
		debug: true,
		fullPaths: true
	})

	var watcher = watchify(bundler);

	return watcher
		.on('update', function () {
			watcher.bundle()
				.on('error', function (err) {
					console.log('There was an error compiling', err.message);
				})
				.pipe(source('bundle.js'))
				.pipe(gulp.dest('./dest/'));
		})
		.bundle()
		.on('error', function (err) {
			console.log('There was an error compiling', err.message);
		})
		.pipe(source('bundle.js'))
		.pipe(gulp.dest('./dest/'));
});

gulp.task('default', ['watchify']);
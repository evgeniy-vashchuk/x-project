/*
	GULP TASKS:
	gulp							- starting default gulp task (sass, watch, browserSync) for development;
	gulp imagemin			- image compression;
	gulp favicon			- favicon generator;
	gulp zip					- project archiving;
*/

var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),
		sourcemaps     = require('gulp-sourcemaps'),
		autoprefixer   = require('gulp-autoprefixer'),
		notify         = require("gulp-notify"),
		tinypng        = require('gulp-tinypng-compress'),
		svgmin         = require('gulp-svgmin'),
		zip            = require('gulp-zip'),
		ico            = require('gulp-to-ico'),
		wait           = require('gulp-wait');

// WORKING WITH SASS FILES
gulp.task('sass', function() {
	return gulp.src('dev/scss/all.scss')
	.pipe(wait(100)) // delay for waiting to compile sass
	.pipe(sourcemaps.init())
	.pipe(sass({
		outputStyle: 'compressed',
		indentType: 'tab',
		indentWidth: 1
	}).on("error", notify.onError({
		title: "Error compiling SASS"
	})))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('dev/css'))
	.pipe(browserSync.reload({stream: true}))
});

// IMAGE COMPRESSION
gulp.task('imagemin:tinypng', function() {
	gulp.src('dev/img/**/*{png,jpg,jpeg}')
	.pipe(tinypng({
		key: 'kEx97Kwcl6gt8PXj1VnvLimN9IXXoppF',
		log: true,
		summarise: true,
		parallel: true,
		parallelMax: 999,
		sigFile: 'dev/img/.tinypng-sigs',
		sameDest: true
	}).on("error", notify.onError({
		title: "TinyPNG error",
	})))
	.pipe(gulp.dest('dev/img'));
});

gulp.task('imagemin:svg', function() {
	return gulp.src('dev/img/**/*.svg')
	.pipe(svgmin())
	.pipe(gulp.dest('dev/img'));
});

gulp.task('imagemin', ['imagemin:tinypng', 'imagemin:svg']);

// FAVICON GENERATOR
gulp.task('favicon', function() {
	return gulp.src('dev/img/favicon/apple-touch-icon-180x180.png')
		.pipe(ico('favicon.ico', { resize: true, sizes: [48] }))
		.pipe(gulp.dest('dev/img/favicon'));
});

// PROJECT ARCHIVING
gulp.task('zip', function() {
	gulp.src('dev/**/*', {base: '.'})
		.pipe(zip('project.zip'))
		.pipe(gulp.dest(''));
})

// LIVERELOAD
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'dev'
		},
		notify: {
			styles: {
				padding: '5px 5px 5px 8px',
				position: 'fixed',
				fontSize: '12px',
				zIndex: '9999',
				borderRadius: '0px 0px 0px 5px',
				color: 'white',
				textAlign: 'center',
				display: 'block',
				backgroundColor: '#26263F'
			}
		},
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

// WATCHING FILES
gulp.task('watch', ['sass', 'browser-sync'], function() {
	// SCSS
	gulp.watch('dev/scss/**/*.scss', ['sass']);
	gulp.watch('dev/libs/**/*.{scss,css}', ['sass']);
	// JS
	gulp.watch('dev/js/**/*.js').on('change', browserSync.reload);
	gulp.watch('dev/libs/**/*.js').on('change', browserSync.reload);
	// HTML
	gulp.watch('dev/*.html').on('change', browserSync.reload);
	// IMAGES
	gulp.watch('dev/img/**.*').on('change', browserSync.reload);
});

gulp.task('default', ['watch']);
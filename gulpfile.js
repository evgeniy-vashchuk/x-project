/*
	ТАСКИ GULP:
	gulp							Запуск дефолтного gulp таска (sass, js, watch, browserSync) для разработки;
	gulp imagemin			Сжатие картинок
	gulp favicon			Генератор favicon
	gulp zip					Архивация проекта
*/

var gulp           = require('gulp'),
		gutil          = require('gulp-util' ),
		sass           = require('gulp-sass'),
		browserSync    = require('browser-sync'),

		rename         = require('gulp-rename'),
		del            = require('del'),
		cache          = require('gulp-cache'),
		cssnano        = require('gulp-cssnano'),

		sourcemaps     = require('gulp-sourcemaps'),
		autoprefixer   = require('gulp-autoprefixer'),
		notify         = require("gulp-notify"),
		tinypng        = require('gulp-tinypng-compress'),
		svgmin         = require('gulp-svgmin'),
		zip            = require('gulp-zip'),
		ico            = require('gulp-to-ico'),
		wait           = require('gulp-wait');

// РАБОТА С SASS ФАЙЛАМИ
gulp.task('sass', function() {
	return gulp.src('dev/scss/all.scss')
	.pipe(wait(100)) // delay for waiting to compile sass
	.pipe(sourcemaps.init())
	.pipe(sass().on("error", notify.onError({
		title: "Error compiling SASS",
	})))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('dev/css'))
	.pipe(browserSync.reload({stream: true}))
});

// РАБОТА С КАРТИНКАМИ
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

// ZIP-АРХИВАЦИЯ ПРОЕКТА
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
				padding: '5px 7px',
				position: 'fixed',
				fontSize: '12px',
				zIndex: '9999',
				borderRadius: '0px 0px 0px 5px',
				color: 'white',
				textAlign: 'center',
				display: 'block',
				backgroundColor: 'rgb(20, 69, 102)'
			}
		},
		// tunnel: true,
		// tunnel: "projectmane", //Demonstration page: http://projectmane.localtunnel.me
	});
});

// СЛЕЖЕНИЕ ЗА ФАЙЛАМИ
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
/*
	GULP TASKS:
	gulp								- starting default gulp task (build, server, watch) for development;
	gulp build					- build project;
	gulp removeDist			- delete dist folder;
	gulp img						- image compression;
	gulp favicon				- favicon generator;
	gulp zip						- project archiving;

	ADDITIONAL OPTIONS:
	--prod							- minification js, minification css, add vendor prefixes, group media queries, remove comments, image compression
	--pug								- using pug preprocessor to generate html
*/

'use strict';

const gulp							= require('gulp'),
			argv							= require('yargs').argv,
			plugins						= require('gulp-load-plugins')({ pattern: '*' }),

			isProduction = (argv.prod !== undefined),
			withPug = (argv.pug !== undefined),
			srcFolder = 'src',
			distFolder = 'dist',

			path = {
				src: {
					html: [srcFolder + '/*.html', '!' + srcFolder + '/_*.html'],
					pug: srcFolder + '/pug/pages/*.pug',
					pugBase: srcFolder + '/pug/pages/',
					css: srcFolder + '/scss/**/*.{scss,sass,css}',
					js: [srcFolder + '/js/**/*.js', '!' + srcFolder + '/js/**/_*.js', '!' + srcFolder + '/js/libs.js'],
					jsLibs: srcFolder + '/js/libs.js',
					imgBitmap: srcFolder + '/img/**/*.{png,jpg,jpeg}',
					imgVector: srcFolder + '/img/**/*.svg',
					favicon: srcFolder + '/img/favicon/apple-touch-icon-180x180.png',
					fonts: srcFolder + '/fonts/**/*.*',
					additionalFiles: srcFolder + '/files/**/*.*',
				},
				dist: {
					html: distFolder + '/',
					css: distFolder + '/css/',
					js: distFolder + '/js/',
					img: distFolder + '/img/',
					favicon: distFolder + '/img/favicon/',
					fonts: distFolder + '/fonts/',
					additionalFiles: distFolder + '/files/',
				},
				watch: {
					html: srcFolder + '/*.html',
					pug: srcFolder + '/pug/**/*.pug',
					css: srcFolder + '/scss/**/*.{scss,sass,css}',
					js: [srcFolder + '/js/**/*.js', '!' + srcFolder + '/js/libs.js'],
					jsLibs: srcFolder + '/js/libs.js',
					img: srcFolder + '/img/**/*.*',
					fonts: srcFolder + '/fonts/**/*.*',
					additionalFiles: srcFolder + '/files/',
				},
				server: distFolder
			};

function getTask(task) {
	return require('./gulp-tasks/' + task)(gulp, plugins, path, isProduction, withPug);
}

// WORKING WITH HTML FILES
gulp.task('html', getTask('html'));

// WORKING WITH PUG FILES
gulp.task('pug', getTask('pug'));

// WORKING WITH SASS FILES
gulp.task('sass', getTask('sass'));

// WORKING WITH JS FILES
gulp.task('js:common', getTask('js-common'));
gulp.task('js:libs', getTask('js-libs'));

// WORKING WITH IMAGES
gulp.task('img:bitmap', getTask('img-bitmap'));
gulp.task('img:vector', getTask('img-vector'));

gulp.task('removeImg', function(done) {
	plugins.del.sync(path.dist.img);
	done();
});

gulp.task('img', gulp.series('removeImg', gulp.parallel('img:bitmap', 'img:vector')));

// WORKING WITH FONTS
gulp.task('fonts', getTask('fonts'));

// ADDITIONAL FILES
gulp.task('additionalFiles', getTask('additional-files'));

// SERVER
gulp.task('server', getTask('server'));

// PROJECT ARCHIVING
gulp.task('zip', getTask('zip'));

// FAVICON GENERATOR
gulp.task('favicon', getTask('favicon'));

// WATCHING FILES
gulp.task('watch', getTask('watch'));

// REMOVE DIST
gulp.task('removeDist', function(done) {
	plugins.del.sync(path.server);
	done();
});

// BUILD
var buildTasks = [withPug ? 'pug' : 'html', 'sass', 'js:common', 'js:libs', 'img', 'fonts', 'additionalFiles'];
gulp.task('build', gulp.series('removeDist', gulp.parallel(buildTasks)));

// DEVELOPMENT
gulp.task('default', gulp.parallel('build', 'server', 'watch'));
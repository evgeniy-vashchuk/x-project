// GULP TASKS:
// gulp								- starting default gulp task (build, server, watch) for development;
// gulp build					- build project;
// gulp removeDist			- delete dist folder;
// gulp img						- image compression;
// gulp zip						- project archiving;
//
// ADDITIONAL OPTIONS:
// --pug								- using pug preprocessor to generate html
// --prod							- minification js, minification css, add vendor prefixes, group media queries, remove comments

const gulp			= require('gulp');
const argv			= require('yargs').argv;
const plugins		= require('gulp-load-plugins')({
	pattern: '*',
	rename: { 'gulp-sass': 'dartSass' }
});
const isProduction = (argv.prod !== undefined);
const copyToWordPress = true;
const withPug = (argv.pug !== undefined);
const srcFolder = 'src';
const distFolder = 'dist';
const path = {
	src: {
		html: [srcFolder + '/*.html', '!' + srcFolder + '/_*.html'],
		pug: srcFolder + '/pug/pages/*.pug',
		pugBase: srcFolder + '/pug/pages/',
		css: srcFolder + '/scss/**/*.{scss,sass,css}',
		js: [srcFolder + '/js/**/*.js', '!' + srcFolder + '/js/**/_*.js', '!' + srcFolder + '/js/libs.js'],
		jsLibs: srcFolder + '/js/libs.js',
		img: srcFolder + '/img/**/*.{gif,png,jpg,jpeg,svg}',
		favicon: srcFolder + '/img/favicon/icon.svg',
		fonts: srcFolder + '/fonts/**/*.*',
		additionalFiles: srcFolder + '/files/',
	},
	dist: {
		html: distFolder + '/',
		css: distFolder + '/css/',
		js: distFolder + '/js/',
		img: distFolder + '/img/',
		favicon: distFolder + '/img/favicon/',
		fonts: distFolder + '/fonts/',
		additionalFiles: distFolder + '/files/',
		wordpress: '/Users/evgeniy_vashchuk/Sites/shaktiman/wp-content/themes/x-project-wp/'
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
	return require('./gulp-tasks/' + task)(gulp, plugins, path, isProduction, withPug, copyToWordPress);
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
gulp.task('img:common', getTask('img-common'));
gulp.task('img:favicon', getTask('img-favicon'));

gulp.task('img', gulp.series('img:common', 'img:favicon'));

// WORKING WITH FONTS
gulp.task('fonts', getTask('fonts'));

// ADDITIONAL FILES
gulp.task('additionalFiles', getTask('additional-files'));

// SERVER
gulp.task('server', getTask('server'));

// PROJECT ARCHIVING
gulp.task('zip', getTask('zip'));

// WATCHING FILES
gulp.task('watch', getTask('watch'));

// REMOVE DIST
gulp.task('removeDist', function(done) {
	plugins.del.sync(path.server, { force: true });
	done();
});

// BUILD
const buildTasks = [withPug ? 'pug' : 'html', 'sass', 'js:common', 'js:libs', 'img', 'fonts', 'additionalFiles'];

gulp.task('build', gulp.series('removeDist', gulp.parallel(buildTasks)));

// DEVELOPMENT
gulp.task('default', gulp.series('build', gulp.parallel('server', 'watch')));

module.exports = function (gulp, plugins, path, isProduction, withPug) {
	return function (done) {
		if (withPug) {
			// PUG
			gulp.watch(path.watch.pug, gulp.series('pug'))
		} else {
			// HTML
			gulp.watch(path.watch.html, gulp.series('html'));
		}

		// SASS
		gulp.watch(path.watch.css, gulp.series('sass'));

		// JS
		gulp.watch(path.watch.js, gulp.series('js:common'));
		gulp.watch(path.watch.jsLibs, gulp.series('js:libs'));

		// IMG
		gulp.watch(path.watch.img, gulp.series('img'));

		// FONTS
		gulp.watch(path.watch.fonts, gulp.series('fonts'));

		// ADDITIONAL FILES
		gulp.watch(path.watch.additionalFiles, gulp.series('additionalFiles'));

		done();
	};
};
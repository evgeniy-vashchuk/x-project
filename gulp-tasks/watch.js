module.exports = function (gulp, plugins, path, isProduction, withPug) {
	return function (done) {
		if (withPug) {
			// PUG
			gulp.watch(path.watch.pug, gulp.parallel('pug')).on('change', plugins.browserSync.reload);
		} else {
			// HTML
			gulp.watch(path.watch.html, gulp.parallel('html')).on('change', plugins.browserSync.reload);
		}

		// SASS
		gulp.watch(path.watch.css, gulp.parallel('sass'));

		// JS
		gulp.watch(path.watch.js, gulp.parallel('js:common'));
		gulp.watch(path.watch.jsLibs, gulp.parallel('js:libs'));

		// IMG
		gulp.watch(path.watch.img, gulp.parallel('img'));

		// FONTS
		gulp.watch(path.watch.fonts, gulp.parallel('fonts'));

		// ADDITIONAL FILES
		gulp.watch(path.watch.additionalFiles, gulp.parallel('additionalFiles'));

		done();
	};
};
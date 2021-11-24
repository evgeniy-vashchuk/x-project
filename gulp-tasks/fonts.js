module.exports = function (gulp, plugins, path, isProduction) {
	return function (done) {
		gulp.src(path.src.fonts)
				.pipe(plugins.destClean(path.dist.fonts))
				.pipe(plugins.newer(path.dist.fonts))
				.pipe(gulp.dest(path.dist.fonts))
				.on('end', plugins.browserSync.reload)

		done();
	};
};
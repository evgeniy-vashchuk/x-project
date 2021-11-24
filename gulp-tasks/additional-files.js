module.exports = function (gulp, plugins, path) {
	return function (done) {
		gulp.src(path.src.additionalFiles)
				.pipe(plugins.destClean(path.dist.additionalFiles))
				.pipe(plugins.newer(path.dist.additionalFiles))
				.pipe(gulp.dest(path.dist.additionalFiles))
				.on('end', plugins.browserSync.reload)

		done();
	};
};
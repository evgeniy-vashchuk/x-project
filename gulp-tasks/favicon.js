module.exports = function (gulp, plugins, path, isProduction) {
	return function (done) {
		gulp.src(path.src.favicon)
			.pipe(plugins.toIco('favicon.ico', { resize: true, sizes: [48] }))
			.pipe(gulp.dest(path.dist.favicon));

		done();
	};
};
module.exports = function (gulp, plugins, path, isProduction) {
	return function (done) {
		gulp.src(path.src.img)
			.pipe(plugins.destClean(path.dist.img))
			.pipe(plugins.newer(path.dist.img))
			.pipe(plugins.imagemin({verbose: true}))
			.pipe(gulp.dest(path.dist.img))
			.pipe(plugins.count('## images was optimized'));

		done();
	};
};
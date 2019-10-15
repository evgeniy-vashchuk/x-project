module.exports = function (gulp, plugins, path, isProduction) {
	return function (done) {
		gulp.src(path.src.imgVector)
			.pipe(plugins.if(isProduction, plugins.svgmin()))
			.pipe(gulp.dest(path.dist.img));

		done();
	};
};
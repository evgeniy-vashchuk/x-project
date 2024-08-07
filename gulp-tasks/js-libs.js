module.exports = function (gulp, plugins, path, isProduction) {
	return function (done) {
		gulp.src(path.src.jsLibs, { allowEmpty: true, sourcemaps: isProduction ? false : true })
			.pipe(plugins.include({separateInputs: true}))
			.pipe(plugins.if(isProduction, plugins.stripComments())) // remove comments
			.pipe(plugins.if(isProduction, plugins.terser())) // minify
			.pipe(plugins.if(isProduction, plugins.rename({suffix: '.min'})))
			.pipe(gulp.dest(path.dist.js, { sourcemaps: '.' }))
			.pipe(plugins.browserSync.stream());

		done();
	};
};
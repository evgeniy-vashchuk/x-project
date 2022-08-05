module.exports = function (gulp, plugins, path, isProduction) {
	return function (done) {
		gulp.src(path.src.js, {allowEmpty: true})
			.pipe(plugins.include({separateInputs: true})) // EXAMPLE OF CONNECTION: //=include _sliders.js
			.pipe(plugins.babel({
				presets: ['@babel/preset-env'],
				retainLines: true,
				compact: false,
			}))
			.pipe(plugins.if(isProduction, plugins.terser())) // minify js
			.pipe(plugins.if(isProduction, plugins.rename({suffix: '.min'})))
			.pipe(plugins.tabify(2, true))
			.pipe(gulp.dest(path.dist.js))
			.pipe(plugins.browserSync.stream());

		done();
	};
};
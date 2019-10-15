module.exports = function (gulp, plugins, path, isProduction) {
	return function (done) {
		gulp.src(path.src.js)
			.pipe(plugins.include({separateInputs: true})) // EXAMPLE OF CONNECTION: //=include _sliders.js
			.pipe(plugins.if(!isProduction, plugins.sourcemaps.init()))
			.pipe(plugins.babel({presets: ['@babel/preset-env']}))
			.pipe(plugins.if(isProduction, plugins.terser())) // minify js
			.pipe(plugins.if(isProduction, plugins.rename({suffix: '.min'})))
			.pipe(plugins.if(!isProduction, plugins.sourcemaps.write('.')))
			.pipe(gulp.dest(path.dist.js))
			.pipe(plugins.browserSync.stream());

		done();
	};
};
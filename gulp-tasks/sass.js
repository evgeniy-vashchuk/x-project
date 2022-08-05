module.exports = function (gulp, plugins, path, isProduction, withPug) {
	return function (done) {
		const sass = plugins.dartSass(require('sass'));

		gulp.src(path.src.css)
			.pipe(plugins.if(!isProduction, plugins.sourcemaps.init()))
			.pipe(sass({
				outputStyle: 'expanded',
				indentType: 'tab',
				indentWidth: 1,
				includePaths: ['./node_modules']
			}).on("error", plugins.notify.onError({
				title: "Error compiling SASS"
			})))
			.pipe(plugins.if(isProduction, plugins.postcss([
				plugins.autoprefixer(['last 10 versions']),
				plugins.cssMqpacker({
					sort: plugins.sortCssMediaQueries
				})
			])))
			.pipe(plugins.if(isProduction, plugins.rename({suffix: '.min'})))
			.pipe(plugins.if(!isProduction, plugins.sourcemaps.write('.')))
			.pipe(gulp.dest(path.dist.css))
			.pipe(plugins.browserSync.stream());

		done();
	};
};
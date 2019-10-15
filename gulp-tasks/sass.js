module.exports = function (gulp, plugins, path, isProduction) {
	return function (done) {
		gulp.src(path.src.css)
			.pipe(plugins.if(!isProduction, plugins.sourcemaps.init()))
			.pipe(plugins.sass({
				outputStyle: 'expanded',
				indentType: 'tab',
				indentWidth: 1
			}).on("error", plugins.notify.onError({
				title: "Error compiling SASS"
			})))
			.pipe(plugins.if(isProduction, plugins.postcss([
				plugins.autoprefixer(['last 10 versions']),
				plugins.cssMqpacker({
					sort: plugins.sortCssMediaQueries
				}),
				plugins.cssnano({
					preset: ['default', {
						discardComments: {
							removeAll: true,
						},
					}]
				})
			])))
			.pipe(plugins.if(isProduction, plugins.rename({suffix: '.min'})))
			.pipe(plugins.if(!isProduction, plugins.sourcemaps.write('.')))
			.pipe(gulp.dest(path.dist.css))
			.pipe(plugins.browserSync.stream());

		done();
	};
};
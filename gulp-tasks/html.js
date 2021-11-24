module.exports = function (gulp, plugins, path, isProduction) {
	return function (done) {
		gulp.src(path.src.html)
			.pipe(plugins.include({separateInputs: true})) // EXAMPLE OF CONNECTION: <!--=include _footer.html -->
			//.pipe(plugins.if(isProduction, plugins.htmlmin({collapseWhitespace: true, removeComments: true})))
			.pipe(plugins.if(isProduction, plugins.replace('css/main.css', 'css/main.min.css')))
			.pipe(plugins.if(isProduction, plugins.replace('js/libs.js', 'js/libs.min.js')))
			.pipe(plugins.if(isProduction, plugins.replace('js/main.js', 'js/main.min.js')))
			.pipe(gulp.dest(path.dist.html))
			.on('end', plugins.browserSync.reload);

		done();
	};
};
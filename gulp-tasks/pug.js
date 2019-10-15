module.exports = function (gulp, plugins, path, isProduction) {
	return function (done) {
		gulp.src(path.src.pug)
			.pipe(plugins.pug({
				basedir: path.src.pugBase,
				pretty: true
			}).on("error", plugins.notify.onError({
				title: "Error compiling PUG"
			})))
			.pipe(plugins.pugBeautify({
				fill_tab: true,
				tab_size: 2
			}))
			//.pipe(plugins.if(isProduction, plugins.htmlmin({collapseWhitespace: true, removeComments: true})))
			.pipe(plugins.if(isProduction, plugins.replace('css/main.css', 'css/main.min.css')))
			.pipe(plugins.if(isProduction, plugins.replace('js/libs.js', 'js/libs.min.js')))
			.pipe(plugins.if(isProduction, plugins.replace('js/main.js', 'js/main.min.js')))
			.pipe(gulp.dest(path.dist.html));

		done();
	};
};
let fs = require('fs');

var FAVICON_DATA_FILE = 'faviconData.json';

module.exports = function (gulp, plugins, path, isProduction) {
	return function (done) {
		gulp.src(path.src.pug)
			.pipe(plugins.pug({
				basedir: path.src.pugBase,
				pretty: true
			}).on("error", plugins.notify.onError({
				title: "Error compiling PUG",
				message: "<%= error.message %>",
			})))
			.pipe(plugins.formatHtml())
			.pipe(plugins.pugBeautify({
				fill_tab: true,
				tab_size: 2
			}))
			.pipe(plugins.if(isProduction, plugins.htmlmin({collapseWhitespace: true, removeComments: true})))
			.pipe(plugins.if(isProduction, plugins.replace('css/main.css', 'css/main.min.css')))
			.pipe(plugins.if(isProduction, plugins.replace('js/libs.js', 'js/libs.min.js')))
			.pipe(plugins.if(isProduction, plugins.replace('js/main.js', 'js/main.min.js')))
			.pipe(plugins.replace('-->', ' -->'))
			// .pipe(plugins.realFavicon.injectFaviconMarkups(JSON.parse(fs.readFileSync(FAVICON_DATA_FILE)).favicon.html_code))
			.pipe(gulp.dest(path.dist.html))
			.on('end', plugins.browserSync.reload)

		done();
	};
};
module.exports = function (gulp, plugins, path, isProduction) {
	return function (done) {
		plugins.del.sync('./*.zip');

		var now = new Date(),
				year = now.getFullYear().toString().padStart(2, '0'),
				month = (now.getMonth() + 1).toString().padStart(2, '0'),
				day = now.getDate().toString().padStart(2, '0'),
				hours = now.getHours().toString().padStart(2, '0'),
				minutes = now.getMinutes().toString().padStart(2, '0');

		gulp.src('**/*', {base: '.'})
				.pipe(plugins.gitignore())
				.pipe(plugins.zip(`project_${year}-${month}-${day}_${hours}-${minutes}.zip`))
				.pipe(gulp.dest('.'));

		done();
	};
};
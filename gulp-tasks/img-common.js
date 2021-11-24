module.exports = function (gulp, plugins, path, isProduction) {
	return function (done) {
		gulp.src(path.src.img)
			.pipe(plugins.destClean(path.dist.img, 'favicon/**'))
			.pipe(plugins.newer(path.dist.img))
			.pipe(plugins.imagemin([
				plugins.imagemin.mozjpeg({quality: 90, progressive: true}),
			], {verbose: true}))
			.pipe(gulp.dest(path.dist.img))
			.on('end', plugins.browserSync.reload)

		done();
	};
};
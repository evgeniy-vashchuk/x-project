module.exports = function(gulp, plugins, path, isProduction, copyToWordPress) {
	return function(done) {
		gulp.src(path.src.fonts)
			.pipe(plugins.destClean(path.dist.fonts))
			.pipe(plugins.newer(path.dist.fonts))
			.pipe(gulp.dest(path.dist.fonts))
			.pipe(plugins.if(copyToWordPress, gulp.dest(path.dist.wordpress + 'fonts/')))
			.on('end', plugins.browserSync.reload);

		done();
	};
};

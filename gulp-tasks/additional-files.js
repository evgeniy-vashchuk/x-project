const fs = require('fs');

module.exports = function(gulp, plugins, path) {
	return function(done) {
		if (fs.existsSync(path.src.additionalFiles)) {
			gulp.src(path.src.additionalFiles + '**/*.*', { encoding: false })
				.pipe(plugins.destClean(path.dist.additionalFiles))
				.pipe(plugins.newer(path.dist.additionalFiles))
				.pipe(gulp.dest(path.dist.additionalFiles))
				.on('end', plugins.browserSync.reload);
		}

		done();
	};
};

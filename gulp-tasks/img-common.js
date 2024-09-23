module.exports = function(gulp, plugins, path, isProduction, copyToWordPress) {
  return function(done) {
    gulp.src(path.src.img, { encoding: false })
      .pipe(plugins.destClean(path.dist.img, 'favicon/**'))
      .pipe(plugins.newer(path.dist.img))
      .pipe(plugins.imagemin([
        plugins.imagemin.mozjpeg({ quality: 90, progressive: true }),
      ], { verbose: true }))
      .pipe(gulp.dest(path.dist.img))
      .pipe(plugins.if(copyToWordPress, gulp.dest(path.dist.wordpress + 'img/')))
      .on('end', plugins.browserSync.reload);

    done();
  };
};

import gulp from 'gulp';
import config from '../config.js';
import { plugins, copyToWordPress } from '../config.js';

const imgCommon = done => {
  gulp.src(config.src.img, { encoding: false })
    .pipe(plugins.destClean(config.dist.img, 'favicon/**'))
    .pipe(plugins.newer(config.dist.img))
    .pipe(plugins.imagemin([
      plugins.imagemin.mozjpeg({ quality: 80, progressive: true }),
    ], { verbose: true }))
    .pipe(gulp.dest(config.dist.img))
    .pipe(plugins.if(copyToWordPress, gulp.dest(config.dist.wordpress + 'img/')))
    .on('end', plugins.browserSync.reload);

  done();
};

export default imgCommon;

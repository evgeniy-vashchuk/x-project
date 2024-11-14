import gulp from 'gulp';
import config from '../config.js';
import { plugins, copyToWordPress } from '../config.js';

const fonts = done => {
  gulp.src(config.src.fonts, { encoding: false })
    .pipe(plugins.destClean(config.dist.fonts))
    .pipe(plugins.newer(config.dist.fonts))
    .pipe(gulp.dest(config.dist.fonts))
    .pipe(plugins.if(copyToWordPress, gulp.dest(config.dist.wordpress + 'fonts/')))
    .on('end', plugins.browserSync.reload);

  done();
};

export default fonts;

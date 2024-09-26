import fs from 'fs';
import gulp from 'gulp';
import config from '../config.js';
import { plugins } from '../config.js';

const additionalFiles = done => {
  if (fs.existsSync(config.src.additionalFiles)) {
    gulp.src(config.src.additionalFiles + '**/*.*', { encoding: false })
      .pipe(plugins.destClean(config.dist.additionalFiles))
      .pipe(plugins.newer(config.dist.additionalFiles))
      .pipe(gulp.dest(config.dist.additionalFiles))
      .on('end', plugins.browserSync.reload);
  }

  done();
};

export default additionalFiles;

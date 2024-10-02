import gulp from 'gulp';
import config from '../config.js';
import { plugins, copyToWordPress } from '../config.js';

const jsLibs = done => {
  gulp.src(config.src.jsLibs, { allowEmpty: true, sourcemaps: config.isProd ? false : true })
    .pipe(plugins.include({ separateInputs: true }))
    .pipe(plugins.if(config.isProd, plugins.stripComments())) // remove comments
    .pipe(plugins.if(config.isProd, plugins.terser())) // minify
    .pipe(plugins.if(config.isProd, plugins.rename({ suffix: '.min' })))
    .pipe(gulp.dest(config.dist.js, { sourcemaps: config.isProd ? false : '.' }))
    .pipe(plugins.if(copyToWordPress, gulp.dest(config.dist.wordpress + 'js/')))
    .pipe(plugins.browserSync.stream());

  done();
};

export default jsLibs;

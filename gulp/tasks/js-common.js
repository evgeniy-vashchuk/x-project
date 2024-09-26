import gulp from 'gulp';
import config from '../config.js';
import { plugins, copyToWordPress } from '../config.js';

const jsCommon = done => {
  gulp.src(config.src.js, { allowEmpty: true })
    .pipe(plugins.include({ separateInputs: true })) // EXAMPLE OF CONNECTION: //=include _sliders.js
    .pipe(plugins.babel({
      presets: ['@babel/preset-env'],
      retainLines: true,
      compact: false,
    }))
    .pipe(plugins.if(config.isProd, plugins.stripComments())) // remove comments
    .pipe(plugins.if(config.isProd, plugins.terser())) // minify
    .pipe(plugins.if(config.isProd, plugins.rename({ suffix: '.min' })))
    .pipe(gulp.dest(config.dist.js))
    .pipe(plugins.if(copyToWordPress, gulp.dest(config.dist.wordpress + 'js/')))
    .pipe(plugins.browserSync.stream());

  done();
};

export default jsCommon;

import gulp from 'gulp';
import config from '../config.js';
import { plugins, copyToWordPress } from '../config.js';

const sass = done => {
  const sass = plugins.gulpSass(plugins.dartSass);

  gulp.src(config.src.css, { sourcemaps: config.isProd ? false : true })
    .pipe(plugins.sassGlob())
    .pipe(sass({
      outputStyle: config.isProd ? 'compressed' : 'expanded',
      indentType: 'space',
      indentWidth: 2,
      includePaths: ['./node_modules']
    }).on('error', plugins.notify.onError({ title: 'Error compiling SASS' })))
    .pipe(plugins.if(config.isProd, plugins.postcss([
      plugins.postcssDiscardComments({ removeAllButFirst: true }),
      plugins.autoprefixer(['last 10 versions']),
      plugins.cssMqpacker({ sort: plugins.sortCssMediaQueries })
    ])))
    .pipe(plugins.if(config.isProd, plugins.rename({ suffix: '.min' })))
    .pipe(gulp.dest(config.dist.css, { sourcemaps: config.isProd ? false : '.' }))
    .on('end', () => {
      if (copyToWordPress) {
        gulp.src(`${config.dist.css}/*.css`)
          .pipe(plugins.replace('../', ''))
          .pipe(plugins.rename('style.css'))
          .pipe(gulp.dest(config.dist.wordpress));
      }
    })
    .pipe(plugins.browserSync.stream());

  done();
};

export default sass;
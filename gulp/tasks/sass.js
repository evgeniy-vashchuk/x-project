import gulp from 'gulp';
import config from '../config.js';
import { plugins, copyToWordPress } from '../config.js';

const sass = done => {
  const sass = plugins.gulpSass(plugins.dartSass);

  gulp.src(config.src.css)
    .pipe(plugins.if(!config.isProd, plugins.sourcemaps.init()))
    .pipe(sass({
      outputStyle: config.isProd ? 'compressed' : 'expanded',
      indentType: 'space',
      indentWidth: 2,
      includePaths: ['./node_modules']
    }).on('error', plugins.notify.onError({ title: 'Error compiling SASS' })))
    .pipe(plugins.if(config.isProd, plugins.postcss([
      plugins.postcssDiscardComments({ removeAll: true }),
      plugins.autoprefixer(['last 10 versions']),
      plugins.cssMqpacker({ sort: plugins.sortCssMediaQueries })
    ])))
    .pipe(plugins.if(config.isProd, plugins.rename({ suffix: '.min' })))
    .pipe(plugins.if(!config.isProd, plugins.sourcemaps.write('.')))
    .pipe(gulp.dest(config.dist.css))
    .pipe(plugins.browserSync.stream())
    .pipe(plugins.if(copyToWordPress, plugins.replace('../', '')))
    .pipe(plugins.if(copyToWordPress, plugins.rename('style.css')))
    .pipe(plugins.if(copyToWordPress, gulp.dest(config.dist.wordpress)));

  done();
};

export default sass;

import gulp from 'gulp';

import config from '../config.js';

import additionalFiles from './additional-files.js';
import fonts from './fonts.js';
import html from './html.js';
import imgCommon from './img-common.js';
import imgFavicon from './img-favicon.js';
import js from './js.js';
import pug from './pug.js';
import sass from './sass.js';

const watch = done => {
  if (config.isPug) {
    // PUG
    global.isPugWatch = true;

    gulp.watch(config.watch.pug, pug).on('all', (event, filepath, stats) => {
      global.emittyChangedFile = {
        path: filepath,
        stats
      };
    });
  } else {
    // HTML
    gulp.watch(config.watch.html, html);
  }

  // SASS
  gulp.watch(config.watch.css, sass);

  // JS
  gulp.watch(config.watch.js, js);

  // IMG
  gulp.watch(config.watch.img, imgCommon);
  gulp.watch(config.watch.favicon, imgFavicon);

  // FONTS
  gulp.watch(config.watch.fonts, fonts);

  // ADDITIONAL FILES
  gulp.watch(config.watch.additionalFiles, additionalFiles);

  done();
};

export default watch;

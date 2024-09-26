// GULP TASKS:
// gulp               - starting default gulp task (build, server, watch) for development;
// gulp build         - build project;
// gulp removeDist    - delete dist folder;
// gulp img           - image compression;
// gulp zip           - project archiving;
//
// ADDITIONAL OPTIONS:
// --pug              - using pug preprocessor to generate html
// --prod             - minification js, minification css, add vendor prefixes, group media queries, remove comments

import gulp from 'gulp';
import config from './gulp/config.js';
import clean from './gulp/tasks/clean.js';
import html from './gulp/tasks/html.js';
import pug from './gulp/tasks/pug.js';
import sass from './gulp/tasks/sass.js';
import jsCommon from './gulp/tasks/js-common.js';
import jsLibs from './gulp/tasks/js-libs.js';
import imgCommon from './gulp/tasks/img-common.js';
import imgFavicon from './gulp/tasks/img-favicon.js';
import fonts from './gulp/tasks/fonts.js';
import additionalFiles from './gulp/tasks/additional-files.js';
import zipTask from './gulp/tasks/zip.js';
import server from './gulp/tasks/server.js';
import watch from './gulp/tasks/watch.js';

config.setEnv();

export const zip = zipTask;

export const build = gulp.series(
  clean,
  gulp.parallel(
    config.isPug ? pug : html,
    sass,
    jsCommon,
    jsLibs,
    imgCommon,
    imgFavicon,
    fonts,
    additionalFiles,
  )
);

export default gulp.series(
  build,
  server,
  watch,
);

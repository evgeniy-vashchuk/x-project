import gulp from 'gulp';
import { setup as emittySetup } from 'emitty';
import config from '../config.js';
import { plugins } from '../config.js';
import formatHtml from 'gulp-format-html';

const emittyPug = emittySetup(config.src.pug, 'pug', { makeVinylFile: true });

global.isPugWatch = false;
global.emittyChangedFile = {
  path: '',
  stats: null,
};

const pug = done => {
  gulp.src(`${config.src.pug}/pages/*.pug`)
    .pipe(plugins.plumber())
    .pipe(plugins.if(
      global.isPugWatch,
      emittyPug.stream(
        global.emittyChangedFile.path,
        global.emittyChangedFile.stats
      )
    ))
    .pipe(plugins.pug({
      basedir: `${config.src.pug}/pages/`,
      pretty: true,
      plugins: [plugins.pugIncludeGlob()],
    }).on('error', plugins.notify.onError({
      title: 'Error compiling PUG',
      message: '<%= error.message %>',
    })))
    .pipe(formatHtml())
    .pipe(plugins.if(config.isProd, plugins.htmlmin({ collapseWhitespace: true, removeComments: true })))
    .pipe(plugins.if(config.isProd, plugins.replace('css/main.css', 'css/main.min.css')))
    .pipe(plugins.if(config.isProd, plugins.replace('js/libs.js', 'js/libs.min.js')))
    .pipe(plugins.if(config.isProd, plugins.replace('js/main.js', 'js/main.min.js')))
    .pipe(plugins.replace(/(<(?:img|input)[^>]*?)\s*\/>/g, '$1>'))
    .pipe(plugins.replace('-->', ' -->'))
    .pipe(gulp.dest(config.dist.html))
    .on('end', plugins.browserSync.reload);

  done();
};

export default pug;

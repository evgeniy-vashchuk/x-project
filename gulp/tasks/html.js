import gulp from 'gulp';
import config from '../config.js';
import { plugins } from '../config.js';

const htmlPath = [`src/*.html`];

const html = done => {
  gulp.src(htmlPath)
    .pipe(plugins.include({ separateInputs: true })) // EXAMPLE OF CONNECTION: <!--=include _footer.html -->
    .pipe(plugins.if(config.isProd, plugins.htmlmin({ collapseWhitespace: true, removeComments: true })))
    .pipe(plugins.if(config.isProd, plugins.replace('css/main.css', 'css/main.min.css')))
    .pipe(plugins.if(config.isProd, plugins.replace('js/libs.js', 'js/libs.min.js')))
    .pipe(plugins.if(config.isProd, plugins.replace('js/main.js', 'js/main.min.js')))
    .pipe(gulp.dest(config.dist.html))
    .on('end', plugins.browserSync.reload);

  done();
};

export default html;

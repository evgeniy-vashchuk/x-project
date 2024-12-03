import gulp from 'gulp';
import config from '../config.js';
import imagemin, { mozjpeg, svgo } from 'gulp-imagemin';
import imageminPngquant from 'imagemin-pngquant';
import imageminWebp from 'imagemin-webp';
import { plugins, copyToWordPress } from '../config.js';
import SVGFixer from 'oslllo-svg-fixer';
import fs from 'fs';
import through from 'through2';

const imgCommon = done => {
  gulp.src([`${config.src.img}**/*.{png,jpg,jpeg,svg}`, `!${config.src.favicon}`, `!${config.src.img}icomoon-icons/**`], { encoding: false })
    .pipe(plugins.destClean(config.dist.img, ['favicon/**', 'icomoon-icons/**', 'webp/**']))
    .pipe(plugins.newer(config.dist.img))
    .pipe(imagemin([
      imageminPngquant({ quality: [0.8, 0.9] }),
      mozjpeg({ quality: 80, progressive: true }),
      svgo({
        plugins: [
          {
            name: 'preset-default',
            params: {
              overrides: {
                cleanupIDs: false,
                removeViewBox: false,
              }
            },
          },
        ],
      })
    ], { verbose: false }))
    .pipe(gulp.dest(config.dist.img))
    .pipe(plugins.if(copyToWordPress, gulp.dest(config.dist.wordpress + 'img/')))
    .on('end', plugins.browserSync.reload);

  done();
};

const imgWebp = done => {
  gulp.src([`${config.src.img}**/*.{png,jpg,jpeg}`, `!${config.src.favicon}`], { encoding: false })
    .pipe(plugins.destClean(config.dist.img + '/webp/', ['favicon/**', 'icomoon-icons/**'], { ext: '.webp' }))
    .pipe(plugins.newer({ dest: config.dist.img + '/webp/', ext: '.webp' }))
    .pipe(imagemin([
      imageminWebp({ quality: 80 }),
    ], { verbose: true }))
    .pipe(plugins.rename({ extname: '.webp' }))
    .pipe(gulp.dest(config.dist.img + '/webp/'))
    .pipe(plugins.if(copyToWordPress, gulp.dest(config.dist.wordpress + 'img/webp/')))
    .on('end', plugins.browserSync.reload);

  done();
};

const icomoonIconsFix = () => {
  const pathSrc = `${config.src.img}icomoon-icons/`,
        pathDist = `${config.dist.img}icomoon-icons/`,
        needFix = fs.existsSync(pathSrc),
        options = {
          showProgressBar: false,
          throwIfDestinationDoesNotExist: false,
        };

  if (needFix && !fs.existsSync(pathDist)) fs.mkdirSync(pathDist, { recursive: true });

  if (needFix && fs.existsSync(pathDist)) {
    SVGFixer(pathSrc, pathDist, options).fix();
  }
};

const imgForIcomoon = done => {
  const pathSrc = `${config.src.img}icomoon-icons/`,
        needFix = fs.existsSync(pathSrc);

  if (!needFix) return done();

  let fileCount = 0;

  return gulp.src(`${config.src.img}icomoon-icons/**/*.svg`, { encoding: false })
    .pipe(plugins.destClean(`${config.dist.img}icomoon-icons/`))
    .pipe(plugins.newer({ dest: `${config.dist.img}icomoon-icons/` }))
    .pipe(through.obj((file, enc, cb) => {
      fileCount++;
      cb(null, file);
    }))
    .pipe(gulp.dest(`${config.dist.img}icomoon-icons/`))
    .pipe(plugins.if(copyToWordPress, gulp.dest(config.dist.wordpress + 'img/icomoon-icons')))
    .on('end', () => {
      if (fileCount > 0) {
        icomoonIconsFix();
      }

      done();
    });
};

export default gulp.parallel(imgCommon, imgWebp, imgForIcomoon);

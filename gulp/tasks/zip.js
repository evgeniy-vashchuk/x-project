import path from 'path';
import { fileURLToPath } from 'url';

import { deleteSync } from 'del';
import gulp from 'gulp';
import zip from 'gulp-zip';

import { plugins } from '../config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../../');
const projectName = path.basename(projectRoot);

const zipTask = done => {
  deleteSync('./*.zip', { force: true });

  const now = new Date(),
        year = now.getFullYear().toString().padStart(2, '0'),
        month = (now.getMonth() + 1).toString().padStart(2, '0'),
        day = now.getDate().toString().padStart(2, '0'),
        hours = now.getHours().toString().padStart(2, '0'),
        minutes = now.getMinutes().toString().padStart(2, '0');

  gulp.src('**/*', { base: '.' })
    .pipe(plugins.gitignore('.gitignore', [], { dot: true }))
    .pipe(zip(`${projectName}_${year}-${month}-${day}_${hours}-${minutes}.zip`))
    .pipe(gulp.dest('.'));

  done();
};

export default zipTask;

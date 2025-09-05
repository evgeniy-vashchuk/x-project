import { deleteSync } from 'del';

import config from '../config.js';

const clean = done => {
  deleteSync(config.dist.root, { force: true });

  done();
};

export default clean;

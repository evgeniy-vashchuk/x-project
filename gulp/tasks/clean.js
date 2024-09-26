import del from 'del';
import config from '../config.js';

const clean = done => {
  del.sync(config.dist.root, { force: true });

  done();
};

export default clean;

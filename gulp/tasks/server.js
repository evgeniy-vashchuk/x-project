import config, { plugins } from '../config.js';

const server = done => {
  plugins.browserSync({
    server: {
      baseDir: config.dist.root,
      directory: true
    },
    notify: {
      styles: {
        padding: '5px 5px 5px 8px',
        position: 'fixed',
        fontSize: '12px',
        zIndex: '9999',
        borderRadius: '0px 0px 0px 5px',
        color: 'white',
        textAlign: 'center',
        display: 'block',
        backgroundColor: '#26263F'
      }
    },
  });

  done();
};

export default server;

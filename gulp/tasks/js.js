import path from 'path';

import gulp from 'gulp';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack-stream';

import config, {
  plugins, copyToWordPress, srcPath
} from '../config.js';

const __dirname = path.resolve();

const getWebpackConfig = (isProduction = false) => ({
  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? false : 'source-map',
  entry: {
    main: `./${srcPath}/js/main.js`
  },
  output: {
    filename: isProduction ? '[name].min.js' : '[name].js'
  },
  resolve: {
    alias: {
      '@utils': path.resolve(__dirname, `${srcPath}/js/utils`),
      '@constants': path.resolve(__dirname, `${srcPath}/js/utils/constants`),
      '@components': path.resolve(__dirname, `${srcPath}/js/components`)
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: '> 0.25%, not dead',
                useBuiltIns: 'usage',
                corejs: 3,
              }]
            ],
            retainLines: true,
            compact: true
          }
        }
      }
    ]
  },
  optimization: {
    minimize: isProduction,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
        terserOptions: {
          format: {
            comments: /@license/i,
          },
          compress: {
            drop_console: true,
            drop_debugger: true,
          },
        },
      }),
    ],
  },
  performance: {
    hints: isProduction ? 'warning' : false,
    maxEntrypointSize: 1024000,
    maxAssetSize: 1024000,
  }
});

const js = done => {
  gulp.src(config.src.js, { allowEmpty: true })
    .pipe(webpack(getWebpackConfig(config.isProd)))
    .pipe(gulp.dest(config.dist.js))
    .pipe(plugins.browserSync.stream());

  if (copyToWordPress) {
    gulp.src(config.src.js, { allowEmpty: true })
      .pipe(webpack(getWebpackConfig(true)))
      .pipe(gulp.dest(config.dist.wordpress + 'js/'));
  }

  done();
};

export default js;

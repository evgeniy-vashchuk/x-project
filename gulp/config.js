import path from 'path';
import gulpLoadPlugins from 'gulp-load-plugins';

// plugins
const __dirname = path.resolve();
export const plugins = gulpLoadPlugins({
  config: path.resolve(__dirname, 'package.json'),
  pattern: '*',
  rename: {
    'sass': 'dartSass',
    'gulp-sass': 'gulpSass',
  },
});

// wp copy
export const copyToWordPress = false;

// config
const srcPath = 'src';
const distPath = 'dist';

const config = {
  src: {
    root: srcPath,
    html: [`${srcPath}/*.html`, `${srcPath}/html/**/*.html`, `!${srcPath}/**/_*.html`],
    pug: `${srcPath}/pug/`,
    css: `${srcPath}/scss/**/*.{scss,sass,css}`,
    js: [`${srcPath}/js/**/*.js`, `!${srcPath}/js/**/_*.js`, `!${srcPath}/js/libs.js`],
    jsLibs: `${srcPath}/js/libs.js`,
    img: `${srcPath}/img/**/*.{gif,png,jpg,jpeg,svg}`,
    favicon: `${srcPath}/img/favicon/icon.svg`,
    fonts: `${srcPath}/fonts/**/*.*`,
    additionalFiles: `${srcPath}/files/`,
  },

  dist: {
    root: distPath,
    html: `${distPath}/`,
    css: `${distPath}/css/`,
    js: `${distPath}/js/`,
    img: `${distPath}/img/`,
    favicon: `${distPath}/img/favicon/`,
    fonts: `${distPath}/fonts/`,
    additionalFiles: `${distPath}/files/`,
    wordpress: '/Users/evgeniy_vashchuk/Sites/project/wp-content/themes/x-project-wp/'
  },

  watch: {
    html: [`${srcPath}/*.html`, `${srcPath}/html/**/*.html`],
    pug: `${srcPath}/pug/**/*.pug`,
    css: `${srcPath}/scss/**/*.{scss,sass,css}`,
    js: [`${srcPath}/js/**/*.js`, `!${srcPath}/js/libs.js`],
    jsLibs: `${srcPath}/js/libs.js`,
    img: `${srcPath}/img/**/*.{gif,png,jpg,jpeg,svg}`,
    favicon: `${srcPath}/img/favicon/icon.svg`,
    fonts: `${srcPath}/fonts/**/*.*`,
    additionalFiles: `${srcPath}/files/`,
  },

  setEnv() {
    this.isProd = process.argv.includes('--prod');
    this.isPug = process.argv.includes('--pug');
  }
};

export default config;

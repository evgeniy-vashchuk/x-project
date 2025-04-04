![Start HTML Template](https://raw.githubusercontent.com/inkogn1to/x-project/master/src/img/x-project.jpg)

---

📌 **RECOMMENDED TO USE WITH [X-PROJECT COMPONENTS](https://evgeniy-vashchuk.github.io/x-project-components/index.html)** 📌

---

# About

X-Project - is starter template with basic tasks for development, which uses [Gulp](https://gulpjs.com) to compile SASS to CSS (with **SCSS** syntax), add vendor prefixes, group media queries, remove comments and minimise CSS, convert ES6 into ES5 using Babel, optimising images (with creating of webp versions and lazyloading), [Browsersync](https://browsersync.io/) for live-reload while development, favicon generator and project archiving. It includes the following libraries and frameworks (as a starting base):

- jQuery
- Bootstrap 5
- Swiper
- Select2
- Vanilla Lazyload
- Icomoon

###### A few words about the structure:

**src/** - "source" files to build and develop the project. This is where the original source files are located, before being compiled into fewer files to **dist/**.
**dist/** - the compiled code ("distribution").

Our project follow [SASS guidelines](https://sass-guidelin.es/#architecture).

Also all HTML/PUG & CSS/SCSS & JS code is linted and formated by [Prettier](https://prettier.io/), [Stylelint](https://stylelint.io/), [ESLint](https://eslint.org/), [EditorConfig](https://editorconfig.org/). And by Git pre-commit hooks you cannot commit the changes if the code doesn't pass linting-review.

# How to use

1. You must have installed:

- [Node.js](https://nodejs.org/en/)
- [Gulp](https://gulpjs.com/)

2. [Download](/inkogn1to/x-project/archive/master.zip) or clone **X-Project** from Github
3. Install Node Modules:

```
npm i
```

4. Run the project:

```
gulp
```

# Gulp tasks

- **gulp** - starting default gulp task (build, server, watch) for development
- **gulp build** - build project
- **gulp removeDist** - delete dist folder
- **gulp img** - image compression
- **gulp favicon** - favicon generator
- **gulp zip** - project archiving

###### Additional options:

- **--prod** - minification js, minification css, add vendor prefixes, group media queries, remove comments, image compression
- **--pug** - using pug preprocessor to generate html

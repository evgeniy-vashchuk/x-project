<p>
	<img src="https://raw.githubusercontent.com/inkogn1to/x-project/master/src/img/x-project.jpg" alt="Start HTML Template">
</p>

---

<p align="center">
	📌 <strong>RECOMMENDED TO USE WITH <a href="https://evgeniy-vashchuk.github.io/x-project-components/index.html">X-PROJECT COMPONENTS</a></strong> 📌
</p>

---

<h2>About</h2>

<p>X-Project - is starter template with basic tasks for development, which uses <a href="https://gulpjs.com">Gulp</a> to compile CSS to SASS (with <strong>SCSS</strong> syntax), add vendor prefixes, group media queries, remove comments and minimise CSS, convert ES6 into ES5 using Babel, optimising images (with <a href="https://tinypng.com/">TinyPNG</a> and <a href="https://github.com/svg/svgo">SVGO</a>), <a href="https://browsersync.io/">Browsersync</a> for live-reload while development, simple favicon generator and project archiving. It includes the following libraries and frameworks:</p>

<ul>
	<li>jQuery</li>
	<li>Bootstrap 4</li>
	<li>Font Awesome 5</li>
	<li>Icomoon</li>
	<li>Slick slider</li>
	<li>Slick lightbox</li>
</ul>

<h5>A few words about the structure:</h5>

<p><strong>src/</strong> - "source" files to build and develop the project. This is where the original source files are located, before being compiled into fewer files to <strong>dist/</strong>.</p>
<p><strong>dist/</strong> - the compiled code ("distribution").</p>

<p>Our project follow <a href="https://sass-guidelin.es/#architecture">Sass guidelines</a>.</p>

<h2>How to use</h2>

<p>1) You must have installed:</p>

<ul>
	<li><a href="https://nodejs.org/en/">Node.js</a></li>
	<li><a href="https://gulpjs.com/">Gulp</a></li>
</ul>

<p>2) <a href="/inkogn1to/x-project/archive/master.zip">Download</a> or clone <strong>X-Project</strong> from Github</p>
<p>3) Install Node Modules:</p>

```
npm i
```

<p>4) Run the project:</p>

```
gulp
```

<h2>Gulp tasks</h2>

<ul>
	<li><strong>gulp</strong> - starting default gulp task (build, server, watch) for development</li>
	<li><strong>gulp build</strong> - build project</li>
	<li><strong>gulp removeDist</strong> - delete dist folder</li>
	<li><strong>gulp img</strong> - image compression</li>
	<li><strong>gulp favicon</strong> - favicon generator</li>
	<li><strong>gulp zip</strong> - project archiving</li>
</ul>

<h5>Additional options:</h5>
<ul>
	<li><strong>--prod</strong> - minification js, minification css, add vendor prefixes, group media queries, remove comments, image compression</li>
	<li><strong>--pug</strong> - using pug preprocessor to generate html</li>
</ul>


<h2>Changelog</h2>

| Changes | Date |
| ----- | ----- |
| Added Pug, absolute cover mixin, mixin keyframe delay in iteration.| 26.08.2018 |
| Release of version №2 | 15.10.2019 |

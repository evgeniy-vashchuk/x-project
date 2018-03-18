<p>
	<img src="https://raw.githubusercontent.com/inkogn1to/x-project/master/dev/img/x-project.jpg" alt="Start HTML Template">
</p>

<h2>About</h2>

<p>X-project - is starter template with basic tasks for development, which uses <a href="https://gulpjs.com">Gulp</a> to compile CSS to SASS (with <strong>SCSS</strong> syntax), minimise CSS, optimising images, <a href="https://browsersync.io/">Browsersync</a> for live-reload while development, simple favicon generator and project archiving. It includes the following libraries and frameworks:</p>

<ul>
	<li>jQuery</li>
	<li>Bootstrap 4</li>
	<li>Font Awesome 5</li>
	<li>Icomoon</li>
	<li>Slick slider</li>
	<li>Slick lightbox</li>
</ul>

<h2>How to use</h2>

<p>1) You must have installed:</p>

<ul>
	<li><a href="https://nodejs.org/en/">Node.js and npm</a></li>
	<li><a href="https://gulpjs.com/">Gulp</a></li>
</ul>

<p>2) Download or clone X-project from Github</p>
<p>3) Install modules whit a command:</p>

```
npm i
```

<ol>
	<li><a href="https://github.com/agragregra/OptimizedHTML-4/archive/master.zip">Download</a> <strong>OptimizedHTML 4</strong> from GitHub;</li>
	<li>Install Node Modules: <strong>npm i</strong>;</li>
	<li>Run the template: <strong>gulp</strong>.</li>
</ol>

<h2>Gulp tasks:</h2>

<ul>
	<li><strong>gulp</strong>: run default gulp task (sass, js, watch, browserSync) for web development;</li>
	<li><strong>rsync</strong>: project deployment on the server from <strong>dist</strong> folder via <strong>RSYNC</strong>;</li>
</ul>

<h2>Rules for working with the starting HTML template</h2>

<ol>
	<li>All HTML files should have similar initial content as in <strong>app/index.html</strong>;</li>
	<li><strong>Template Basic Images Start</strong> comment in app/index.html - all your custom template basic images (og:image for social networking, favicons for a variety of devices);</li>
	<li><strong>Custom Browsers Color Start</strong> comment in app/index.html: set the color of the browser head on a variety of devices;</li>
	<li><strong>Custom HTML</strong> comment in app/index.html - all your custom HTML;</li>
	<li>For installing new jQuery library, just run the command "<strong>bower i plugin-name</strong>" in the terminal. Libraries are automatically placed in the folder <strong>app/libs</strong>. Bower must be installed in the system (npm i -g bower). Then place all jQuery libraries paths in the <strong>'libs'</strong> task (gulpfile.js);</li>
	<li>All custom JS located in <strong>app/js/common.js</strong>;</li>
	<li>All Sass vars placed in <strong>app/sass/_vars.sass</strong>;</li>
	<li>All Bootstrap media queries placed in <strong>app/sass/_media.sass</strong>;</li>
	<li>All libraries CSS styles placed in <strong>app/sass/_libs.sass</strong>;</li>
	<li>Rename <strong>ht.access</strong> to <strong>.htaccess</strong> before place it in your web server. This file contain rules for files caching on web server.</li>
</ol>

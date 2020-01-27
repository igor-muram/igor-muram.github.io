# demo
<p>Demonstration of a personal HTML template for a quick start of site layout.</p>

<p>Template author: <a href="https://github.com/igor-muram">Igor Muramshchikov</a>.</p>

<p>View a <a href="https://igor-muram.github.io/demo/index.html" target="_blank">demo</a>.</p>

<p>Web Template is a starter template for quick start layout. The template includes the most frequently used tools and plugins:</p>

<ul>
	<li><a href="https://bootstrap-4.ru" target="_blank">Bootstrap 4 (grid и reboot)</a></li>
	<li><a href="https://gulpjs.com" target="_blank">Gulp 4</a></li>
	<li><a href="https://jquery.com" target="_blank">JQuery</a></li>
	<li><a href="https://sass-scss.ru" target="_blank">Sass and Scss Preprocessors</a></li>
	<li><a href="https://fontawesome.com" target="_blank">Font Awesome</a></li>
	<li><a href="https://bower.io" target="_blank">Bower</a></li>
	<li><a href="https://mmenujs.com" target="_blank">Mmenu</a></li>
	<li><a href="https://jonsuh.com/hamburgers/" target="_blank">Css-hamburgers</a></li>
</ul>

<p>Images used in the template are responsive. For image responsiveness, specify the <b>img-responsive</b> class and use the <b>srcset</b> attribute.</p>

<p>The template includes the following files:</p>

<ul>
	<li><b>.htaccess</b> (caching rules for the web server)</li>
	<li><b>.bowerrc</b> (specifying the path for loading plugins using Bower)</li>
	<li><b>README.md</b> (information about the template with a link to the demo)</li>
	<li><b>gulpfile.js</b> (tasks for working Gulp)</li>
	<li><b>package.json</b> (package versions for installing Node Modules)</li>
</ul>

<p>The template has a default:</p>

<ul>
	<li>Menu with integrated search</li>
	<li>Preloader</li>
	<li>Button to return to the top of the page</li>
</ul>

<p>The template contains starting styles and animations for the elements:</p>

<ul>
	<li>Buttons</li>
	<li>Checkboxes</li>
	<li>Switches</li>
	<li>Sliders</li>
	<li>Accordions</li>
	<li>Tooltips</li>
	<li>Social Icons</li>
</ul>

<h2 style="text-align: center;">How to use a template</h3>

<ul>
	<li>For working with the template, install <a href="https://nodejs.org/en/">NodeJS</a>.</li>
	<li><a href="#">Download</a> the <b>Web Template</b> from the GitHub page.</li>
	<li>Install Node Modules with the <b>npm i</b> command.</li>
	<li>Run the template with the <b>gulp</b> command.</li>
</ul>

<h2 style="text-align: center;">How to interact with a template using Gulp</h3>

<ul>
	<li>At the beginning of the <b>gulpfile.js</b> file, you can change the desired css preprocessor (Sass or Scss). Sass preprocessor installed.</li>
	<li><b>gulp</b>: Run the 'default' task containing sass | scss, js, watch and browserSync for web development.</li>
	<li><b>build</b>: build the project and update the dist folder.</li>
	<li><b>rsync</b>: deploy the project to the server from the dist folder using rsync.</li>
</ul>

<h2 style="text-align: center;">Rules for working with the template</h3>

<ul>
	<li>All HTML files should have the same initial content, as in the <b>app/index.html</b> file.</li>
	<li><b>Template Basic Images Start</b> comment in the <b>app/index.html</b> file is the beginning of standard user images (og: image for social networks, favicons - icons for various devices).</li>
	<li><b>Custom Browsers Color Start</b> comment in the <b>app/index.html</b> file is setting the color of the browser title on various devices.</li>
	<li><b>Custom HTML</b> in the <b>app/index.html</b> file is start of custom HTML markup.</li>
	<li>For installing new jQuery library, use the command "<b>bower i library_name</b>" in the command window. Libraries are automatically added to the <b>app/libs</b> folder. Also you must install Bower (command "<b>npm i -g bower</b>"). After installation, write the path to the js library file in the <b>gulpfile.js</b> file in the '<b>scripts</b>' task.</li>
	<li>For changing color of the page, change the value of the variable '<b>accent</b>' in the file <b>app/sass/_vars.sass</b> | <b>app/scss/_vars.scss</b>.</li>
	<li>For changing animation of the hamburger icon for the menu, <a href="https://jonsuh.com/hamburgers/">select the desired class</a> and change it in the <b>app/index.html</b> file. Also in this source you can find detailed instructions for configuring the plugin.</li>
	<li>All user scripts must be in the <b>app/js/common.js</b> file and begin after a <b>Custom JS</b> comment.</li>
	<li>All Sass | Scss variables must be in the <b>app/sass/_vars.sass</b> | <b>app/scss/_vars.scss</b> file.</li>
	<li>All styles of the elements created by default are in the <b>app/sass/_UI.sass</b> | <b>app/scss/_UI.scss</b> file. To use an element, choose the necessary design option and repeat the markup described for it in the <b>app/index.html</b> file.</li>
	<li>All Bootstrap media queries must be in the <b>app/sass/_media.sass</b> | <b>app/scss/_media.scss</b> file.</li>
	<li>All CSS files of libraries must be in the <b>app/sass/_libs.sass</b> | <b>app/scss/_libs.scss</b> file.</li>
</ul>
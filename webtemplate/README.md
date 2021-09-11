# WebTemplate
Demonstration of a personal HTML template for a quick start of site layout.<br>

Template author: [Igor Muramshchikov](https://github.com/igor-muram).<br>

View a [demo](https://igor-muram.github.io/webtemplate/index.html).<br>

Web Template is a starter template for quick start layout. The template includes the most frequently used tools and plugins:<br>

* [Bootstrap 4 (grid и reboot)](https://bootstrap-4.ru)
* [Gulp 4](https://gulpjs.com)
* [JQuery](https://jquery.com)
* [Sass and Scss Preprocessors](https://sass-scss.ru)
* [Font Awesome](https://fontawesome.com)
* [Bower](https://bower.io)
* [Mmenu](https://mmenujs.com)
* [Css-hamburgers](https://jonsuh.com/hamburgers/)

Images used in the template are responsive. For image responsiveness, specify the <b>img-responsive</b> class.<br>

The template includes the following files:<br>

* <b>.htaccess</b> (caching rules for the web server)
* <b>.bowerrc</b> (specifying the path for loading plugins using Bower)
* <b>README.md</b> (information about the template with a link to the demo)
* <b>gulpfile.js</b> (tasks for working Gulp)
* <b>package.json</b> (package versions for installing Node Modules)

The template has a default:<br>

* Menu with integrated search
* Preloader
* Button to return to the top of the page

The template contains starting styles and animations for the elements:<br>

* Buttons
* Checkboxes
* Switches
* Sliders
* Accordions
* Tooltips
* Social Icons

## How to use a template

* For working with the template, install [NodeJS](https://nodejs.org/en/).
* [Download](#) the <b>Web Template</b> from the GitHub page.
* Install Node Modules with the <b>npm i</b> command.
* Run the template with the <b>gulp</b> command.

## How to interact with a template using Gulp

* At the beginning of the <b>gulpfile.js</b> file, you can change the desired css preprocessor (Sass or Scss). Sass preprocessor installed.
* <b>gulp</b>: Run the 'default' task containing sass | scss, js, watch and browserSync for web development.
* <b>build</b>: build the project and update the dist folder.
* <b>rsync</b>: deploy the project to the server from the dist folder using rsync.

## Rules for working with the template

* All HTML files should have the same initial content, as in the <b>app/index.html</b> file.
* <b>Template Basic Images Start</b> comment in the <b>app/index.html</b> file is the beginning of standard user images (og: image for social networks, favicons - icons for various devices).
* <b>Custom Browsers Color Start</b> comment in the <b>app/index.html</b> file is setting the color of the browser title on various devices.
* <b>Custom HTML</b> in the <b>app/index.html</b> file is start of custom HTML markup.
* For installing new jQuery library, use the command "<b>bower i library_name</b>" in the command window. Libraries are automatically added to the <b>app/libs</b> folder. Also you must install Bower (command "<b>npm i -g bower</b>"). After installation, write the path to the js library file in the <b>gulpfile.js</b> file in the '<b>scripts</b>' task.
* For changing color of the page, change the value of the variable '<b>accent</b>' in the file <b>app/sass/_vars.sass</b> | <b>app/scss/_vars.scss</b>.
* For changing animation of the hamburger icon for the menu, [select the desired class](https://jonsuh.com/hamburgers/) and change it in the <b>app/index.html</b> file. Also in this source you can find detailed instructions for configuring the plugin.
* All user scripts must be in the <b>app/js/common.js</b> file and begin after a <b>Custom JS</b> comment.
* All Sass | Scss variables must be in the <b>app/sass/_vars.sass</b> | <b>app/scss/_vars.scss</b> file.
* All styles of the elements created by default are in the <b>app/sass/_UI.sass</b> | <b>app/scss/_UI.scss</b> file. To use an element, choose the necessary design option and repeat the markup described for it in the <b>app/index.html</b> file.
* All Bootstrap media queries must be in the <b>app/sass/_media.sass</b> | <b>app/scss/_media.scss</b> file.
* All CSS files of libraries must be in the <b>app/sass/_libs.sass</b> | <b>app/scss/_libs.scss</b> file.

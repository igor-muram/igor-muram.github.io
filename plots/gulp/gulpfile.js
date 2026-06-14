const fs = require('fs');
const path = require('path');
const { PassThrough } = require('stream');

const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const terser = require('gulp-terser');
const cleancss = require('gulp-clean-css');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const del = require('del');
const fileinclude = require('gulp-file-include');

const syntax = 'sass'; /* Syntax: sass or scss; */
const rootDir = path.resolve(__dirname, '../src');
const distDir = path.join(__dirname, '..');
const libsDir = path.join(rootDir, 'libs');
const distCssDir = path.join(distDir, 'css');
const distJsDir = path.join(distDir, 'js');
const nodeModulesDir = path.join(__dirname, 'node_modules');
const vendorMarker = path.join(libsDir, 'jquery', 'dist', 'jquery.min.js');

function toGlob(...segments) {
	return path.join(...segments).replace(/\\/g, '/');
}

function copyDirectory(from, to) {
	fs.mkdirSync(path.dirname(to), { recursive: true });
	fs.cpSync(from, to, { recursive: true, force: true });
}

function copyFile(from, to) {
	fs.mkdirSync(path.dirname(to), { recursive: true });
	fs.copyFileSync(from, to);
}

function rewriteFontAwesomePaths() {
	for (const fileName of ['all.css', 'all.min.css']) {
		const filePath = path.join(libsDir, 'fontawesome', 'css', fileName);

		if (!fs.existsSync(filePath)) {
			continue;
		}

		const content = fs.readFileSync(filePath, 'utf8')
			.replace(/\.\.\/webfonts\//g, '../fonts/fontawesome/');

		fs.writeFileSync(filePath, content);
	}
}

function vendor(done) {
	fs.rmSync(libsDir, { recursive: true, force: true });

	copyDirectory(
		path.join(nodeModulesDir, 'jquery', 'dist'),
		path.join(libsDir, 'jquery', 'dist')
	);
	copyDirectory(
		path.join(nodeModulesDir, 'mmenu-js', 'dist'),
		path.join(libsDir, 'mmenu', 'dist')
	);
	copyDirectory(
		path.join(nodeModulesDir, 'jsxgraph', 'distrib'),
		path.join(libsDir, 'jsxgraph', 'distrib')
	);
	copyDirectory(
		path.join(nodeModulesDir, 'mathjax'),
		path.join(libsDir, 'MathJax')
	);
	copyDirectory(
		path.join(nodeModulesDir, 'bootstrap', 'scss'),
		path.join(libsDir, 'bootstrap', 'scss')
	);
	copyDirectory(
		path.join(nodeModulesDir, 'hamburgers', 'dist'),
		path.join(libsDir, 'css-hamburgers', 'dist')
	);
	copyDirectory(
		path.join(nodeModulesDir, '@fortawesome', 'fontawesome-free', 'css'),
		path.join(libsDir, 'fontawesome', 'css')
	);
	copyFile(
		path.join(nodeModulesDir, 'particles.js', 'particles.js'),
		path.join(libsDir, 'particles-js', 'particles.min.js')
	);

	rewriteFontAwesomePaths();
	done();
}

function ensureVendor(done) {
	if (fs.existsSync(vendorMarker)) {
		done();
		return;
	}

	vendor(done);
}

function browserSyncStream() {
	return browserSync.active ? browserSync.stream() : new PassThrough({ objectMode: true });
}

/* Local Server */
function serve(done) {
	browserSync.init({
		server: {
			baseDir: distDir
		},
		notify: false,
	});
	done();
}

/* Sass|Scss Styles */
function styles() {
	return gulp.src(toGlob(rootDir, `${syntax}/main.${syntax}`))
		.pipe(sass({ outputStyle: 'compressed' }).on('error', notify.onError()))
		.pipe(rename({ suffix: '.min', prefix: '' }))
		.pipe(autoprefixer(['last 15 versions']))
		.pipe(cleancss({ level: { 1: { specialComments: 0 } } }))
		.pipe(gulp.dest(distCssDir))
		.pipe(browserSyncStream());
}

/* JS */
function scripts() {
	return gulp.src([
		toGlob(libsDir, 'jquery/dist/jquery.min.js'),
		toGlob(libsDir, 'mmenu/dist/mmenu.js'),
		toGlob(libsDir, 'particles-js/particles.min.js'),
		toGlob(libsDir, 'jsxgraph/distrib/jsxgraphcore.js'),
		toGlob(rootDir, 'js/common.js'),
	])
		.pipe(concat('scripts.min.js'))
		.pipe(terser())
		.pipe(gulp.dest(distJsDir))
		.pipe(browserSyncStream());
}

/* Remove 'dist' */
function removedist() {
	return del([
		toGlob(distDir, '**/*'),
		toGlob(distDir, '.htaccess'),
		`!${toGlob(distDir, 'gulp')}`,
		`!${toGlob(distDir, 'gulp/**/*')}`,
		`!${toGlob(distDir, 'src')}`,
		`!${toGlob(distDir, 'src/**/*')}`,
		`!${toGlob(distDir, '.gitignore')}`
	], { force: true });
}

/* Build */
function copyRootFiles() {
	return gulp.src([
		toGlob(rootDir, '.htaccess'),
		toGlob(rootDir, '*.md')
	]).pipe(gulp.dest(distDir));
}

function copySass() {
	return gulp.src([
		toGlob(rootDir, 'sass/**/*.sass'),
	]).pipe(gulp.dest(path.join(distDir, 'sass')));
}

function copyJs() {
	return gulp.src([
		toGlob(rootDir, 'js/common.js'),
	]).pipe(gulp.dest(distJsDir));
}

function copyFonts() {
	return gulp.src([
		toGlob(rootDir, 'fonts/**/*.*'),
	]).pipe(gulp.dest(path.join(distDir, 'fonts')));
}

function copyImages() {
	return gulp.src([
		toGlob(rootDir, 'img/**/*.*'),
	]).pipe(gulp.dest(path.join(distDir, 'img')));
}

function copyHTMLs() {
	return gulp.src(toGlob(rootDir, '*.html'))
		.pipe(fileinclude({ prefix: '@@', basepath: '@file' }))
		.pipe(gulp.dest(distDir))
		.pipe(browserSync.reload({ stream: true }));
}

function watch() {
	gulp.watch([
		toGlob(rootDir, '*.html'),
		toGlob(rootDir, 'parts/**/*.html'),
	], copyHTMLs);
	gulp.watch(toGlob(rootDir, `${syntax}/**/*.${syntax}`), styles);
	gulp.watch([toGlob(rootDir, 'js/common.js')], scripts);
}

const build = gulp.series(
	vendor,
	removedist,
	styles,
	scripts,
	copyHTMLs,
	gulp.parallel(copyRootFiles, copySass, copyJs, copyFonts, copyImages)
);

const copyAssets = gulp.parallel(copyRootFiles, copyJs, copyFonts, copyImages);
const dev = gulp.series(
	ensureVendor,
	gulp.parallel(styles, scripts),
	copyHTMLs,
	copyAssets,
	gulp.parallel(serve, watch)
);

gulp.task('vendor', vendor);
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('build', build);
gulp.task('default', dev);

exports.vendor = vendor;
exports.styles = styles;
exports.scripts = scripts;
exports.build = build;
exports.default = dev;

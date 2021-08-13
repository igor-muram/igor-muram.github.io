let	syntax        = 'sass'; /* Syntax: sass or scss; */

let	gulp          = require('gulp'),
   	gutil         = require('gulp-util'),
   	sass          = require('gulp-sass'),
   	browserSync   = require('browser-sync'),
   	concat        = require('gulp-concat'),
   	terser        = require('gulp-terser'),
   	cleancss      = require('gulp-clean-css'),
   	rename        = require('gulp-rename'),
   	autoprefixer  = require('gulp-autoprefixer'),
   	notify        = require('gulp-notify'),
   	del           = require('del');

/* Local Server */
gulp.task('browser-sync', function() {
	browserSync({
		server: {
			baseDir: 'app'
		},
		notify: false,
	})
});

/* Sass|Scss Styles */
gulp.task('styles', function() {
	return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
	.pipe(sass({ outputStyle: 'compressed' }).on("error", notify.onError()))
	.pipe(rename({ suffix: '.min', prefix : '' }))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleancss({ level: { 1: { specialComments: 0 } } })) /* Opt., comment out when debugging */
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({ stream: true }))
});

/* JS */
gulp.task('scripts', function() {
	return gulp.src([
		'app/libs/jquery/dist/jquery.min.js',
		'app/libs/slick-carousel/slick/slick.min.js',
		'app/libs/wow/dist/wow.min.js',
		'app/libs/jquery.fancybox/jquery.fancybox.min.js',
		'app/js/common.js',                             /* Always at the end */
	])
	.pipe(concat('scripts.min.js'))
	.pipe(terser())                               		/* Minify js (opt.) */
	.pipe(gulp.dest('app/js'))
	.pipe(browserSync.reload({ stream: true }))
});

/* HTML Live Reload */
gulp.task('code', function() {
	return gulp.src('app/*.html')
	.pipe(browserSync.reload({ stream: true }))
});

/* Remove folder 'dist' */
gulp.task('removedist', function(done) { 
	return del(['dist']); 
	done();
});

/* Build */
gulp.task('build', gulp.series('removedist', 'styles', 'scripts', function(ContinueProcess) {

	ContinueProcess();

	let buildFiles = gulp.src([
		'app/*.html',
		'app/.htaccess',
		'.gitignore',
		]).pipe(gulp.dest('space'));

	let buildCss = gulp.src([
		'app/css/main.min.css',
		]).pipe(gulp.dest('space/css'));

	let buildSass = gulp.src([
		'app/sass/**/*.*',
		]).pipe(gulp.dest('space/sass'));

	let buildJs = gulp.src([
		'app/js/scripts.min.js',
		]).pipe(gulp.dest('space/js'));

	let buildImg = gulp.src([
		'app/img/**/*.*',
		]).pipe(gulp.dest('space/img'));

	let buildFonts = gulp.src([
		'app/fonts/**/*.*',
		]).pipe(gulp.dest('space/fonts'));

	let buildGulp = gulp.src([
		'gulpfile.js',
		'.bowerrc',
		'package.json',
		]).pipe(gulp.dest('space/gulp'));

}));

gulp.task('watch', function() {
	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('code'));
});

gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch'));
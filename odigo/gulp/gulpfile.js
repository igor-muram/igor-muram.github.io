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
		'app/libs/slick-carousel/slick/slick.js',
		'app/libs/wow/dist/wow.min.js',
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
		]).pipe(gulp.dest('dist'));

	let buildCss = gulp.src([
		'app/css/main.min.css',
		]).pipe(gulp.dest('dist/css'));

	let buildJs = gulp.src([
		'app/js/*.js',
		]).pipe(gulp.dest('dist/js'));

	let buildImg = gulp.src([
		'app/img/**/*.*',
		]).pipe(gulp.dest('dist/img'));

}));

gulp.task('watch', function() {
	gulp.watch('app/'+syntax+'/**/*.'+syntax+'', gulp.parallel('styles'));
	gulp.watch(['libs/**/*.js', 'app/js/common.js'], gulp.parallel('scripts'));
	gulp.watch('app/*.html', gulp.parallel('code'));
});

gulp.task('default', gulp.parallel('styles', 'scripts', 'browser-sync', 'watch'));
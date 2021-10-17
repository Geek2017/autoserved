var gulp        = require('gulp');
var sass        = require('gulp-sass');
var minifyCSS   = require('gulp-clean-css');
var concat      = require('gulp-concat');
var sourcemaps  = require('gulp-sourcemaps');
var livereload  = require('gulp-livereload');
var connect     = require('gulp-connect');
var download    = require('gulp-download2');
var header      = require('gulp-header');
var uglify      = require('gulp-uglify');
var merge       = require('merge-stream');
var fileinclude = require('gulp-file-include');

gulp.task('html', function() {
  return gulp.src(['src/html/*.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      rootPath: './'
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(livereload());
});

gulp.task('css-vendor', function(){
  return gulp.src([
  	'node_modules/@fortawesome/fontawesome-free/css/all.min.css',
  	'node_modules/jquery-ui-dist/jquery-ui.min.css',
  	'node_modules/animate.css/animate.min.css',
  	'node_modules/pace-js/themes/black/pace-theme-flash.css'
  	])
    .pipe(sass())
    .pipe(concat('vendor.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/assets/css/'))
    .pipe(livereload());
});

gulp.task('css-app', function(){
  return gulp.src([
  	'src/scss/font.scss',
  	'src/scss/styles.scss'
  	])
    .pipe(sass())
    .pipe(concat('app.min.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist/assets/css/'))
    .pipe(livereload());
});

gulp.task('css-img', function(){
	return gulp.src([ 'src/scss/images/**' ])
		.pipe(gulp.dest('dist/assets/css/images'));
});

gulp.task('fonts', function() {
  return gulp.src(['node_modules/@fortawesome/fontawesome-free/webfonts/*'])
    .pipe(gulp.dest('dist/assets/webfonts/'));
});

gulp.task('img', function() {
  return gulp.src(['src/img/**'])
    .pipe(gulp.dest('dist/assets/img/'))
    .pipe(livereload());
});

gulp.task('plugins', function() {
	download([
		'http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/styles/default.min.css',
		'http://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.18.1/highlight.min.js'
	]).pipe(gulp.dest('dist/assets/plugins/highlight.js/'));
	download([
		'https://jvectormap.com/js/jquery-jvectormap-world-mill.js'
	]).pipe(gulp.dest('dist/assets/plugins/jvectormap-next/'));
	
	var pluginFiles = [
  	'node_modules/bootstrap/**',
  	'node_modules/jquery-slimscroll/**',
  	'node_modules/js-cookie/**',
  	'node_modules/@fortawesome/**',
  	'node_modules/jquery/**',
  	'node_modules/jquery-ui-dist/**',
  	'node_modules/animate.css/**',
  	'node_modules/pace-js/**',
  	'node_modules/@fullcalendar/**',
  	'node_modules/apexcharts/**',
  	'node_modules/blueimp-file-upload/**',
  	'node_modules/blueimp-tmpl/**',
  	'node_modules/blueimp-gallery/**',
  	'node_modules/blueimp-canvas-to-blob/**',
  	'node_modules/blueimp-load-image/**',
  	'node_modules/bootstrap-datepicker/**',
  	'node_modules/bootstrap-daterangepicker/**',
  	'node_modules/bootstrap-slider/**',
  	'node_modules/bootstrap-timepicker/**',
  	'node_modules/bootstrap-3-typeahead/**',
  	'node_modules/bootstrap-table/**',
  	'node_modules/chart.js/**',
  	'node_modules/datatables.net/**',
  	'node_modules/datatables.net-bs4/**',
  	'node_modules/datatables.net-autofill/**',
  	'node_modules/datatables.net-autofill-bs4/**',
  	'node_modules/datatables.net-buttons/**',
  	'node_modules/datatables.net-buttons-bs4/**',
  	'node_modules/datatables.net-colreorder/**',
  	'node_modules/datatables.net-colreorder-bs4/**',
  	'node_modules/datatables.net-fixedcolumns/**',
  	'node_modules/datatables.net-fixedcolumns-bs4/**',
  	'node_modules/datatables.net-fixedheader/**',
  	'node_modules/datatables.net-fixedheader-bs4/**',
  	'node_modules/datatables.net-keytable/**',
  	'node_modules/datatables.net-keytable-bs4/**',
  	'node_modules/datatables.net-responsive/**',
  	'node_modules/datatables.net-responsive-bs4/**',
  	'node_modules/datatables.net-rowgroup/**',
  	'node_modules/datatables.net-rowgroup-bs4/**',
  	'node_modules/datatables.net-rowreorder-bs4/**',
  	'node_modules/datatables.net-scroller/**',
  	'node_modules/datatables.net-scroller-bs4/**',
  	'node_modules/datatables.net-select/**',
  	'node_modules/datatables.net-select-bs4/**',
  	'node_modules/jvectormap-next/*',
		'node_modules/jquery-migrate/dist/**',
  	'node_modules/jquery.maskedinput/**',
  	'node_modules/kbw-countdown/**',
  	'node_modules/masonry-layout/dist/**',
  	'node_modules/moment/**',
  	'node_modules/photoswipe/**',
  	'node_modules/select-picker/**',
  	'node_modules/spectrum-colorpicker2/dist/**',
  	'node_modules/summernote/**',
		'node_modules/tag-it/css/**',
		'node_modules/tag-it/js/**'
	];
	return gulp.src(pluginFiles, { base: './node_modules/' }).pipe(gulp.dest('dist/assets/plugins'));
});

gulp.task('js-vendor', function(){
  return gulp.src([
  	'node_modules/pace-js/pace.min.js',
  	'node_modules/jquery/dist/jquery.min.js',
  	'node_modules/jquery-ui-dist/jquery-ui.min.js',
  	'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js',
  	'node_modules/jquery-slimscroll/jquery.slimscroll.min.js',
  	'node_modules/js-cookie/src/js.cookie.js'
  	])
    .pipe(sourcemaps.init())
    .pipe(concat('vendor.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(livereload())
});

gulp.task('js-app', function(){
  return gulp.src([
  	'src/js/app.js',
  	])
    .pipe(sourcemaps.init())
    .pipe(concat('app.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(livereload())
});

gulp.task('js-demo', function(){
  return gulp.src('src/js/demo/**')
    .pipe(gulp.dest('dist/assets/js/demo/'))
    .pipe(livereload());
});

gulp.task('watch', function () {
	livereload.listen();
  gulp.watch('src/html/*.html', gulp.series(gulp.parallel(['html'])));
  gulp.watch('src/html/**/*.html', gulp.series(gulp.parallel(['html'])));
  
  gulp.watch('src/scss/**.scss', gulp.series(gulp.parallel(['css-app'])));
  gulp.watch('src/scss/**/**.scss', gulp.series(gulp.parallel(['css-app'])));
  
  gulp.watch('src/js/*.js', gulp.series(gulp.parallel(['js-app'])));
  gulp.watch('src/js/**/*.demo.js', gulp.series(gulp.parallel(['js-demo'])));
  
  gulp.watch('src/img/**', gulp.series(gulp.parallel(['img'])));
});

gulp.task('webserver', function() {
	connect.server({
		name: 'AspStudio',
		root: ['./dist/'],
		port: 8000,
		livereload: true,
		fallback: 'index.html'
	});
});

gulp.task('default', gulp.series(gulp.parallel([ 'html', 'css-vendor', 'css-app', 'css-img', 'js-vendor', 'js-app', 'js-demo', 'img', 'fonts', 'watch', 'webserver' ])));
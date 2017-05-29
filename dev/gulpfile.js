var gulp = require('gulp'),
    pug = require('gulp-pug'),
    sass = require('gulp-sass')
    browserSync = require('browser-sync').create()
    concat = require('gulp-concat')
    uglifyjs = require('gulp-uglifyjs')
    rucksack = require('gulp-rucksack')
    imagemin = require('gulp-imagemin');

gulp.task('sync', ['copyfiles', 'compress:css', 'html'], function() {
	browserSync.init({
		server: '../build/'
	});

	gulp.watch('./assets/css/*.sass', ['compress:css']);
  gulp.watch('./assets/js/main.js', ['compress:js']);
	gulp.watch('./**.pug', ['html']);
	gulp.watch('./build/*.html').on('change', browserSync.reload);
});

gulp.task('copyfiles', ['copyjs'], function() {
  return gulp.src('./node_modules/bulma/css/bulma.css')
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('copyjs', function() {
  return gulp.src('./node_modules/jquery/dist/jquery.min.js')
        .pipe(gulp.dest('./assets/js'));
});

gulp.task('compress:js', function() {
  return gulp.src(['./assets/js/jquery.min.js', './assets/js/main.js'])
        .pipe(concat('bundle.min.js'))
        .pipe(uglifyjs())
        .pipe(gulp.dest('../build/assets/js'))
        .pipe(browserSync.stream());
});

gulp.task('compress:css', ['css'], function() {
  return gulp.src(['./assets/css/bulma.css', './assets/css/main.css', './assets/css/contato.css'])
        .pipe(concat('bundle.min.css'))
        .pipe(gulp.dest('../build/assets/css'))
        .pipe(browserSync.stream());
});

gulp.task('html', function() {
  return gulp.src('./*.pug')
        .pipe(pug())
        .pipe(gulp.dest('../build'))
        .pipe(browserSync.stream());
});

gulp.task('css', function() {
  return gulp.src('./assets/css/*.sass')
        .pipe(sass())
        .pipe(rucksack({
          autoprefixer: true,
        }))
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('deploy:image', function() {
  return gulp.src('./assets/images/**')
        .pipe(imagemin())
        .pipe(gulp.dest('../build/assets/images'));
});
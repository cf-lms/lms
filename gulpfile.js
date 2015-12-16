var gulp = require('gulp');
	eslint = require('gulp-eslint');
var minifyCss = require('gulp-minify-css');
var gulpWatch = require('gulp-watch');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');

gulp.task('static:dev', function() {
  return gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
});

gulp.task('lint', function () {
	return gulp.src(['app/**/*.js', '!node_modules/**'])
	.pipe(eslint.format())
	.pipe(eslint.failAfterError());
});
 

gulp.task('sass:dev', function() {
  return gulp.src('./app/sass/**/*.scss')
  .pipe(maps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(minifyCss())
  .pipe(maps.write('./'))
  .pipe(gulp.dest('build/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch(['./app/sass/**/*.scss', './app/index.html'], ['sass:dev', 'static:dev']);
});

gulp.task('build', ['static:dev', 'sass:dev']);
gulp.task('default', ['build:dev']);
gulp.task('default', ['lint']);

var gulp = require('gulp');
var eslint = require('gulp-eslint');
var minifyCss = require('gulp-minify-css');
var gulpWatch = require('gulp-watch');
var sass = require('gulp-sass');
var maps = require('gulp-sourcemaps');
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');
var webpack = require('webpack-stream');
var babel = require('gulp-babel');

gulp.task('static:dev', function() {
  return gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
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

gulp.task('jscs', function() {
  return gulp.src(appFiles)
  .pipe(jscs())
  .pipe(stylish());
});

gulp.task('lint', function () {
  return gulp.src(['app/**/*.js', '!node_modules/**'])
  .pipe(eslint.format())
  .pipe(eslint.failAfterError());
});

gulp.task('webpack:dev', function() {
  return gulp.src('app/jsx/entry.jsx')
  .pipe(webpack({
    module: {
      loaders: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015']
          }
        }
      ]
    },
    output: {
      filename: 'bundle.js'
    }
  }))
  .pipe(gulp.dest('build/'));
});

gulp.task('build', ['static:dev', 'sass:dev', 'webpack:dev']);
gulp.task('default', ['build:dev', 'jscs', 'lint']);

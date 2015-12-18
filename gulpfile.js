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
var mocha = require('gulp-mocha');

var appFiles = ['index.js', 'lib/**/*.js'];
var testFiles = ['test/**/*.js'];

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

gulp.task('fonts:dev', function() {
  return gulp.src('./app/sass/icons/fonts/**')
  .pipe(gulp.dest('build/css/fonts'));
});

gulp.task('images:dev', function() {
  return gulp.src('./app/images/**')
  .pipe(gulp.dest('build/images'));
});

gulp.task('sass:watch', function () {
  gulp.watch(['./app/sass/**/*.scss', './app/index.html'], ['sass:dev', 'static:dev']);
});

gulp.task('jscs', function() {
  return gulp.src('app/**/*.js')
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
            presets: ['react']
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

gulp.task('mocha:test', function() {
  return gulp.src(testFiles)
    .pipe(mocha({
      read: false,
      reporter: 'nyan'
    }))
});

gulp.task('webpack:test', function() {
  return gulp.src('test/client_test/test_entry.jsx')
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
      filename: 'test_bundle.js'
    }
  }))
  .pipe(gulp.dest('test/__tests__/'));
});

gulp.task('css:dev', ['sass:dev', 'images:dev', 'fonts:dev']);
gulp.task('default', ['build:dev', 'jscs', 'lint']);
gulp.task('test', ['webpack:test']);
gulp.task('build', ['static:dev', 'webpack:dev', 'css:dev']);

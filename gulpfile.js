var gulp = require('gulp');
var webpack = require('webpack-stream');
var babel = require('gulp-babel');


gulp.task('static:dev', function() {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
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


gulp.task('build', ['static:dev', 'webpack:dev']);

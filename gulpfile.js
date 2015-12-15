var gulp = require('gulp');


gulp.task('static:dev', function() {
  gulp.src('app/**/*.html')
  .pipe(gulp.dest('build/'));
});


gulp.task('build', ['static:dev']);

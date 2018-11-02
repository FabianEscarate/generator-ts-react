var gulp = require('gulp');
var gls = require('gulp-live-server');
// var sass = require('gulp-sass');
var webpack = require('webpack-stream');
var webpack_config = require('./webpack.config');

gulp.task('webpack', function () {
  gulp.src(['./src/*.tsx', './src/**/*.scss'])
    .pipe(webpack(webpack_config))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch', () => {
  gulp.watch(['./src/**/*'], ['webpack']);
});

gulp.task('serve', ['webpack', 'watch'], function () {
  var server = gls.static('./', 9000);
  server.start();
});

gulp.task('default', function () {
  // place code for your default task here
});
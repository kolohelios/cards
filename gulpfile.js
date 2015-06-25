'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var run = require('run-sequence');
var watch = require('gulp-watch');

var filePaths = {
  src: ['./']
};

gulp.task('default', function(callback){
  run('serve', 'watch', callback);
});

gulp.task('serve', function(){
  return browserSync({server: filePaths.src});
});

gulp.task('watch', function(){
  return watch(filePaths.src, function(){
    gulp.start('refresh');
  });
});

gulp.task('refresh', function(){
  gulp.run('reload');
});

gulp.task('reload', function(){
  return browserSync.reload();
});

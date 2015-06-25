'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var run = require('run-sequence');
var watch = require('gulp-watch');

var filePaths = {
  src: ['./client/'],
  pub: ['./public/']
};

gulp.task('default', function(callback){
  run('copy', 'serve', 'watch', callback);
});

gulp.task('serve', function(){
  return browserSync({server: filePaths.pub});
});

gulp.task('watch', function(){
  return watch(filePaths.src, function(){
    gulp.start('refresh');
  });
});

gulp.task('refresh', function(){
  run('copy', 'reload');
});

gulp.task('reload', function(){
  return browserSync.reload();
});

gulp.task('copy', function(){
  gulp.src('./client/*')
  .pipe(gulp.dest('./public/'));
})

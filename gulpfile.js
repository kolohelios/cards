'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var run = require('run-sequence');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var del = require('del');

var filePaths = {
  src: ['./client/'],
  pub: ['./public/'],
  codeSrc: ['./client/**/*.js'],
  temp: 'temp/'
};

gulp.task('default', function(callback){
  run('clean', 'concatJS', 'copy', 'serve', 'watch', callback);
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
  run('clean', 'concatJS', 'copy', 'reload');
});

gulp.task('reload', function(){
  return browserSync.reload();
});

gulp.task('copy', function(){
  gulp.src('./client/*')
  .pipe(gulp.dest('./public/'));
  del('public/index.js');
  gulp.src('./temp/index.js')
  .pipe(gulp.dest('public/'));
});

gulp.task('concatJS', function(){
  gulp.src(filePaths.codeSrc)
  .pipe(concat('index.js'))
  .pipe(gulp.dest(filePaths.temp));
});

gulp.task('clean', function(callback){
  del(['temp/*', 'public/index.*'], callback);
});

/* global require */

'use strict';

var browserSync = require('browser-sync');
var gulp = require('gulp');
var run = require('run-sequence');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var del = require('del');
var jade = require('gulp-jade');

var filePaths = {
  src: ['./client/'],
  pub: ['./public/'],
  codeSrc: ['./client/**/*.js'],
  jadeSrc: ['./client/**/*.jade'],
  temp: 'temp/'
};

var isProd = process.env.NODE_ENV === 'production';

gulp.task('default', function(callback){
  run('clean', 'copy', 'jade', 'concatJS', 'serve', 'watch', callback);
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
  run('clean', 'copy', 'jade', 'concatJS', 'reload');
});

gulp.task('reload', function(){
  return browserSync.reload();
});

gulp.task('copy', function(){
  gulp.src('./client/**/*')
  .pipe(gulp.dest('./public/'));
});

gulp.task('concatJS', function(callback){
  gulp.src(filePaths.codeSrc)
  .pipe(concat('index.js'))
  .pipe(gulp.dest('./public/'));
  callback();
});

gulp.task('jade', function() {
  return gulp.src(filePaths.jadeSrc)
    .pipe(jade({pretty: true, doctype: 'html', locals: {isProd: isProd}}))
    .pipe(gulp.dest('./public/'));
});

gulp.task('clean', function(callback){
  del(['temp/*', 'public/index.*', 'public/config/*', 'public/models/*', 'public/views/*'], callback);
});

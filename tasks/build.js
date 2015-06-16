'use strict';

// deps
var gulp = require('gulp');
var runSequence = require('run-sequence');

//
// BUILD:DEV task
//
gulp.task('build:dev', ['clean'], function(cb) {
  runSequence(
      'clear:terminal',
      'copy:dependencies',
      [
          'css:dev',
          'js:dev',
          'copy'
      ],
      'browser:serve',
      'watch',
  cb);
});

//
//  BUILD task
//
gulp.task('build', function(cb){
    // @TODO
});

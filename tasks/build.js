'use strict';

// deps
var gulp = require('gulp');
var runSequence = require('run-sequence');

//
// BUILD:DEV task
//
gulp.task('build:dev', ['clean'], function(cb) {
  runSequence('copy:dependencies',
  [
      'css:dev',
    //   'js:dev',
      'copy'
  ], cb);
});

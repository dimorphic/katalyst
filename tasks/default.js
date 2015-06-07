'use strict';

// deps
var gulp = require('gulp');
var gutil = require('gulp-util');
var runSequence = require('run-sequence');

//
//  DEFAULT TASK (gulp respawner!)
//  ...spawns gulp with 'develop' task as real 'default'
//
gulp.task('default', ['respawn']);

//
//  DEVELOPMENT task
//
gulp.task('develop', function(cb){
    return runSequence('clear:terminal', 'build:dev', ['browser:serve', 'watch'], cb);
});

//
//  BUILD task
//
gulp.task('build', function(cb){
    // @TODO
});

'use strict';

// deps
var gulp = require('gulp');
var spawn = require('child_process').spawn;
var clear = require('clear');
var q = require('q');

//
//	CLEAR TERMINAL task
//
gulp.task('clear:terminal', function() {
    clear();
    return q().delay(100);
});

//
//	KILL GULP task
//
gulp.task('kill:gulp', function() {
    console.log('<<< [process:kill] killing...');
    process.exit(0);
});

//
//	SPAWN GULP task
//
gulp.task('respawn', function() {
	//
    // spawn child process helper
    // ...used to respawn default process when needed (eg: config change?)
	//
    var spawnGulp = function() {
        console.log('>>> [process:spawn] spawning new gulp...');
        var proc = spawn('gulp', ['build:dev'], { stdio: 'inherit' }); // child will use parent's stdios

        // when this process gets terminated (as user intends)
        // ...spawn again
        proc.on('close', function (code) {
            spawnGulp();
        });
    };

    // first spawn
    spawnGulp();
});

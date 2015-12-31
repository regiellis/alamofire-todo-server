/**
 * Gulp Tasks 
 * @file Gulp task configuration file
 * @author Regi Ellis <regi@bynine.io>
 */

 'use strict';

 const Gulp = require('gulp');
 const Babel = require('gulp-babel');
 const source_directory = [
     `${__dirname}/server.js`,
     `${__dirname}/api.js`,
     `${__dirname}/bootstrap.js`
 ];
 const server_components = `${__dirname}/server`;

 Gulp.task('compile', function() {
    return Gulp.src(source_directory)
    .pipe(Babel({ presets: ['es2015'] }))
    .pipe(Gulp.dest(server_components))
 });

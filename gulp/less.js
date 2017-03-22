var gulp = require("gulp");
var path = require("path");
var less = require("gulp-less");            // compiles less
var cleanCSS = require('gulp-clean-css'); // minifies CSS files

// compiles less & minifies into single file
module.exports = function(src, dest) {
    return gulp.src(src)
        .pipe(less({ paths: [ path.join(__dirname, "less", "includes") ] })) 
        .pipe(cleanCSS({compatibility: '*'})) // CleanCSS options https://github.com/jakubpawlowicz/clean-css#how-to-use-clean-css-api
        .pipe(gulp.dest(dest));   
}
var gulp = require("gulp");
var util = require("gulp-util");    
var gulpconcat = require("gulp-concat");    // concatenates all files together
var ts = require("gulp-typescript");        // compiles typescript

module.exports = function(src, dest, bundleName) {
    var tsOptions = {
        "target": "es5",
        "module": "commonjs",
        "removeComments" : true,
        "declaration": true
    };

    return gulp.src(src)
        .pipe(ts(tsOptions))
        .dts
        .pipe(bundleName ? gulpconcat(bundleName) : util.noop())
        .pipe(gulp.dest(dest));
}
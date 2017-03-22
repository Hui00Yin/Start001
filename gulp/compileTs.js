var gulp = require("gulp");
var util = require("gulp-util");
var gulpconcat = require("gulp-concat");    // concatenates all files together
var preprocess = require("gulp-preprocess");// does preprocessing of files
var ts = require("gulp-typescript");        // compiles typescript
var uglify = require("gulp-uglify");        // minifies javascript
var sourcemaps = require("gulp-sourcemaps");

module.exports = function(src, dest, optionsSrc, bundleName, useUglify, useSourcemaps, preprocessContext) {
    var tsOptions = optionsSrc ?
        ts.createProject(optionsSrc) : {
            "target": "es5",
            "module": "commonjs",
            "removeComments" : true
        };
    var context = { context: preprocessContext || { } }

    return gulp.src(src)
        .pipe(preprocess(context))
        .pipe(useSourcemaps ? sourcemaps.init() : util.noop())
        .pipe(ts(tsOptions))
        .pipe(bundleName ? gulpconcat(bundleName) : util.noop())
        .pipe(useUglify ? uglify( { mangle: true }) : util.noop())
        .pipe(useSourcemaps ? sourcemaps.write("./") : util.noop())
        .pipe(gulp.dest(dest));
}
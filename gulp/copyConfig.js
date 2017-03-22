var gulp = require("gulp");
var rename = require("gulp-rename");
var util = require("gulp-util");  
var preprocess = require("gulp-preprocess");// does preprocessing of files

/** copies files & folders from a source glob to a destination  */
module.exports = function(src, dest, preprocessContext) {
    var context = { context: preprocessContext || { } };
    return gulp.src(src)
        .pipe(rename("config.js")) // gulp preprocess will NOT do anything to .json files, need to rename first to .js
        .pipe(preprocess(context))
        .pipe(rename("config.json"))
        .pipe(gulp.dest(dest));
}
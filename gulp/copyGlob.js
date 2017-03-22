var gulp = require("gulp");
var util = require("gulp-util");  
var preprocess = require("gulp-preprocess");// does preprocessing of files

/** copies files & folders from a source glob to a destination  */
module.exports = function(srcGlob, dest, preprocessContext) {
    return gulp.src(srcGlob)
        .pipe( preprocessContext ? preprocess({ context: preprocessContext }) : util.noop())
        .pipe(gulp.dest(dest));
}
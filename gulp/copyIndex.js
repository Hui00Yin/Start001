var gulp = require("gulp");
var preprocess = require("gulp-preprocess");// does preprocessing of files

module.exports = function(src, dest, preprocessContext) {
    // minify & bundle all template HTML files into the angular $templateCache 
    return gulp.src(src)
        // injects variables into intex.html
        .pipe(preprocess({ context: preprocessContext }))  //To set environment variables in-line use <!--<script src="app/onyx_<!-- @echo GUID --> to set GUID for cachebusting
        .pipe(gulp.dest( dest ));
}
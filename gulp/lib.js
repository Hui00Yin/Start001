var fs = require("fs");
var gulp = require("gulp");
var gulpconcat = require("gulp-concat");    // concatenates all files together
var util = require("gulp-util");

/** concat defined libraries into single js file */
module.exports = function(name, files, dest) {
    var isMissing = false;
    // check if all libraries exist before starting
    for (var x = 0; x < files.length; x++) {
        if (!fs.existsSync(files[x])) {
            util.log("Library file " + files[x] + " is missing!");
            isMissing = true;
        }
    }

    return isMissing ? util.noop() : 
        gulp.src( files )
            .pipe(gulpconcat(name))
            .pipe(gulp.dest( dest ));
}
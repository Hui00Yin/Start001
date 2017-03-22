var gulp = require("gulp");
var angularTemplateCache = require("gulp-angular-templatecache");

/** minify & bundle all template HTML files into the angular $templateCache */ 
module.exports = function(src, dest, moduleName, fileName) {
    return gulp.src(src)
        //.pipe(minifyHtml( {empty:true} ))
        .pipe(angularTemplateCache({
            module: moduleName, 
            filename: fileName,
            //root: "/"
            standalone: true
        }))
        .pipe(gulp.dest(dest));
}
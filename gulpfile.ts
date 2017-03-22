import * as gulp from 'gulp';
import {ENV} from './tools/config';
let browserify = require("browserify");
let source = require('vinyl-source-stream');
let tsify = require("tsify");
let sourcemaps = require('gulp-sourcemaps');
let liveServer = require("live-server");
let runSequence = require("run-sequence");  // runs tasks

let tasks = {
    clean: "clean",
    default: "default",
    build: "build",
    compileLess: "less",
    createServer: "serve"
};

gulp.task('begin', done => {
    console.log(ENV);
});

var paths = {
    pages: ['app/**/*.html']
};

gulp.task("copy-html", function () {
    return gulp.src(paths.pages)
        .pipe(gulp.dest("Dest"));
});

gulp.task(tasks.compileLess, () => {
    let src = [
        'app/assets/less/**/main.less'
    ];

    let dest ='Dest/assets/css';
    return require("./gulp/less")(src, dest);
});

gulp.task("build", ["copy-html"], function () {
    return browserify({
        basedir: '.',
        debug: true,
        entries: ["app/src/boot/boot.ts"],
        cache: {},
        packageCache: {}
    })
    .plugin(tsify)
    .bundle()
    .pipe(source('materialApp.js'))
    .pipe(gulp.dest("Dest"));
});

// Serve files from the destination of this project
gulp.task(tasks.createServer, () => {
    let params = {
        port: 8080, // Set the server port. Defaults to 8080.
        host: "localhost", // Set the address to bind to. Defaults to 0.0.0.0 or process.env.IP.
        root: ".", // Set root directory that's being served. Defaults to cwd.
        open: "/Dest", // When false, it won't load your browser by default.
        //ignore: 'scss,my/templates', // comma-separated string for paths to ignore
        //file: "index.html", // When set, serve this file for every 404 (useful for single-page applications)
        wait: 1000, // Waits for all changes, before reloading. Defaults to 0 sec.
        //mount: [['/components', './node_modules']], // Mount a directory to a route.
        logLevel: 2, // 0 = errors only, 1 = some, 2 = lots
        //middleware: [function (req, res, next) { next(); }] // Takes an array of Connect-compatible middleware that are injected into the server middleware stack
    };

    liveServer.start(params);
});

gulp.task(tasks.default, (done) => {
    runSequence(tasks.build, tasks.createServer, done);
});




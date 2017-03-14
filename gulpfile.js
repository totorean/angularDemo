var gulp = require('gulp');
var Server = require('karma').Server;

//plugins
var debug = require('gulp-filelog');
var connect = require('gulp-connect');
var jshint = require('gulp-jshint');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');
var gnf = require('gulp-npm-files');
var clean = require('gulp-clean');
var runSequence = require('run-sequence');
var gulpDocs = require('gulp-ngdocs');

//generate code comment based documentation for the app
gulp.task('ngdocs', [], function () {
    var options = {
        html5Mode: true,
        startPage: '/api',
        title: "Darksky Forecast Docs"
    }
    gulp.src('./docs/*')
        .pipe(clean({
            force: true
        }));
    gulp.src('app/**/*.js')
        .pipe(debug())
        .pipe(gulpDocs.process(options))
        .pipe(gulp.dest('./docs'));
});


// tasks
gulp.task('clean', function () {
    gulp.src('./dist/*')
        .pipe(clean({
            force: true
        }));
});
gulp.task('minify-css', function () {
    var opts = {
        comments: true,
        spare: true
    };
    gulp.src('./app.css')
        .pipe(minifyCSS(opts))
        .pipe(gulp.dest('./dist/'));
    gulp.src('./app/**/*.css')
        .pipe(minifyCSS(opts))
        .pipe(gulp.dest('./dist/app/'));
});
gulp.task('minify-js', function () {
    gulp.src('./app.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/'));
    gulp.src('./app/**/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/app/'));
});
gulp.task('copy-npm-dependencies', function () {
    gulp.src(gnf(), {
            base: './'
        })
        .pipe(gulp.dest('./dist/'));
});
gulp.task('copy-html-files', function () {
    gulp.src('./index.html')
        .pipe(gulp.dest('./dist/'));
    gulp.src('./app/**/*.html')
        .pipe(gulp.dest('./dist/app/'));
});
gulp.task('copy-json-files', function () {
    gulp.src('./app/**/*.json')
        .pipe(gulp.dest('./dist/app/'));
});
gulp.task('copy-assets', function () {
    return gulp.src(['./assets/**/*'], {
        base: '.'
    }).pipe(gulp.dest('dist'));
});
// Run tests once and exit
gulp.task('test', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});

// detect changes on files and rerun tests
gulp.task('tdd', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js'
    }, done).start();
});

//run this task for development
gulp.task('connect', function () {
    connect.server({
        root: '.',
        port: 8000
    });
});
//run this task to see how the distribution files look before deployment
gulp.task('connectDist', function () {
    connect.server({
        root: './dist',
        port: 9000
    });
});


// default task
gulp.task('default', ['tdd', 'connect']);
gulp.task('build', function () {
    runSequence(
    ['clean'], ['test'], ['minify-css', 'minify-js', 'copy-html-files', 'copy-json-files', 'copy-assets', 'copy-npm-dependencies'], ['connectDist']
    );
});
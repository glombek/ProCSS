var gulp = require('gulp'),
    jekyll = require('gulp-jekyll'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass');
 
gulp.task('jekyll-build', ["scss"], function (done) {
    browserSync.notify('Building Jekyll...');
    var stream = gulp.src(['_includes/*.html', '_layouts/*.html', '*.md', '_posts/*'])
        .pipe(jekyll({
            source: './'//,
            //destination: './deploy/',
            //bundleExec: true
        }));
        //.pipe(gulp.dest('./deploy/'));
        
        stream.on('end', function() {
            done();
        });
});

gulp.task('jekyll-rebuild', ['jekyll-build'], function () {
    browserSync.reload();
});

gulp.task('browser-sync', ['jekyll-build'], function() {
    browserSync({
        server: {
            baseDir: '_site'
        },
        host: "localhost"
    });
});

gulp.task('scss', function () {
  return gulp.src('styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./styles'))
    .pipe(gulp.dest('./_site/styles'))
    .pipe(browserSync.reload({stream:true}));
});

gulp.task('watch', function() {
  // Watch .scss files
  gulp.watch('styles/**/*.scss', ['scss']);
  // Watch .js files
  //gulp.watch('src/js/**/*.js', ['js']);
  // Watch .html files and posts
  gulp.watch(['_includes/*.html', '_layouts/*.html', '*.md', '_posts/*'], ['jekyll-rebuild']);
});

gulp.task('default',
    //['clean'],
    function() {
        gulp.start(
            'scss',
            //'js', 
            'browser-sync',
            'watch');
});
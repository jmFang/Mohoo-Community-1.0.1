(function(){
    var fs = require('fs');
    var gulp = require('gulp');
    var runSequence = require('run-sequence');
    var del = require('del');
    var uglify = require('gulp-uglify');
    var concat = require('gulp-concat');
    var minifyCss = require('gulp-minify-css');
    var browserSync = require('browser-sync').create();
    var assets = JSON.parse(fs.readFileSync('assets.json'));

    gulp.task('default', function(callback) {
        return runSequence(['clean'], ['build'], ['serve', 'watch'], callback);
    });

    gulp.task('clean', function(callback) {
        return del(['./dest/'], callback);
    });

    gulp.task('build', function(callback) {
        return runSequence(['assetsJs', 'assetsCss', 'assetsFonts'],['appJs','appCss','copyHtml', 'appImg','configJs'], callback );
    });

    gulp.task('assetsJs', function() {
        return gulp.src(assets.assetsJs)
            .pipe(concat('assets.js', {
                newLine: '\n\n'
            }))
            .pipe(gulp.dest('./dest/assets/js'));
    });

    gulp.task('assetsCss', function() {
        return gulp.src(assets.assetsCss).pipe(concat('assets.css', {
            newLine: '\n\n'
        })).pipe(gulp.dest('./dest/assets/css/'));
    });

    gulp.task('assetsFonts', function() {
        return gulp.src(assets.assetsFonts).pipe(gulp.dest('./dest/assets/fonts/'));
    });

    gulp.task('copyHtml', function() {
        return gulp.src(['./src/**/*.html']).pipe(gulp.dest('./dest/'));
    });

    gulp.task('appJs', function() {
        return gulp.src(assets.appJs).pipe(concat('app.js', {
            newLine: '\n\n'
        })).pipe(gulp.dest('./dest/assets/js/'));
    });

    gulp.task('appCss', function() {
        return gulp.src(assets.appCss).pipe(concat('app.css', {
            newLine: '\n\n'
        })).pipe(gulp.dest('./dest/assets/css/'));
    });

    gulp.task('configJs', function () {
       return gulp.src(assets.configJs)
           .pipe(concat('config.js',{
               newLine:'\n\n'
           })).pipe(gulp.dest('./dest/assets/js/'));
    });
    gulp.task('appImg', function () {
        return gulp.src(assets.appImg)
            .pipe(gulp.dest('./dest/assets/img/'));
    });

/*    gulp.task('componentJs', function () {
        return gulp.src(assets.componentJs)
            .pipe(concat('appComponent.js', {
                newLine: '\n\n'
            }))
            .pipe(gulp.dest('./dest/components/'));
    });*/

    gulp.task('serve', function() {
        return browserSync.init({
            server: {
                baseDir: './dest/'
            },
            port: 8080
        });
    });

    gulp.task('watch', function() {
        return gulp.watch('./src/**/*.*', ['reload']);
    });

    gulp.task('reload', function(callback) {
        return runSequence(['build'], ['reload-browser'], callback);
    });

    gulp.task('reload-browser', function() {
        return browserSync.reload();
    });


}).call(this);
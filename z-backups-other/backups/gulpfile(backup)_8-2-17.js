var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var sassdoc = require('sassdoc');

//Browser-Sync
gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

//Setting Sass for Main Template
gulp.task('styles', function () {
    return gulp.src('scss/main.stl.scss')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        // .pipe(autoprefixer('last 2 versions'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(sassdoc())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./app/main/css/'))
        .pipe(browserSync.reload({stream: true}));
});

// Watching files for changes
gulp.task('watch', function () {
    gulp.watch(['scss/*.scss', 'scss/**/*.scss', 'scss/**/**/*.scss', 'scss/**/**/**/*.scss', 'scss/**/**/**/**/*.scss'], ['styles']);
    gulp.watch('*.html', '**/**/**/*.html', ['bs-reload']);
});

//Run tasks on default
gulp.task('default', ['serve', 'watch', 'styles', 'bs-reload']);
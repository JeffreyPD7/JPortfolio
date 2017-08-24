var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var sassdoc = require('sassdoc');
var pug = require('gulp-pug');

// var watch = require('gulp-watch');

//Browser-Sync
gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: "./app/"
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

// Pug ////////////////////////////////////////////////////
// HOME ------------------------------------------
gulp.task('views-home', function buildHTML() {
    return gulp.src('./pug-scss/pages/home/*.pug',
        {base: './pug-scss/pages/home/'})
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(pug())
        .pipe(gulp.dest('./app/pages/home/'))
});

// ABOUT ------------------------------------------
gulp.task('views-about', function buildHTML() {
    return gulp.src('./pug-scss/pages/about/*.pug',
        {base: './pug-scss/pages/about/'})
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(pug())
        .pipe(gulp.dest('./app/pages/about/'))
});

// SKILLS ------------------------------------------
gulp.task('views-skills', function buildHTML() {
    return gulp.src('./pug-scss/pages/skills/*.pug',
        {base: './pug-scss/pages/skills/'})
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(pug())
        .pipe(gulp.dest('./app/pages/skills/'))
});

// CONTACT ----------------------------------------
gulp.task('views-contact', function buildHTML() {
    return gulp.src('./pug-scss/pages/contact/*.pug',
        {base: './pug-scss/pages/contact/'})
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        // .pipe(pug({
        //     pretty: true
        // }))
        .pipe(pug())
        .pipe(gulp.dest('./app/pages/contact/'))
});



/* end of pug ----------------------------------------------*/


//Setting Sass for Main Template
gulp.task('styles', function () {
    return gulp.src('pug-scss/main.stl.scss')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
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
    gulp.watch(['pug-scss/*.scss',
        'pug-scss/**/*.scss',
        'pug-scss/**/**/*.scss',
        'pug-scss/**/**/**/*.scss',
        'pug-scss/**/**/**/**/*.scss',
        'pug-scss/**/**/**/**/scss/*.scss'], ['styles']);

    /* Pug Content --------------------------------------------------------*/
    gulp.watch(['pug-scss/pages/home/*.pug',
        'pug-scss/pages/home/sections/**/pug/*.pug'], ['views-home']);

    gulp.watch(['pug-scss/pages/about/*.pug',
        'pug-scss/pages/about/sections/**/pug/*.pug'], ['views-about']);

    gulp.watch(['pug-scss/pages/skills/*.pug',
        'pug-scss/pages/skills/sections/**/pug/*.pug'], ['views-skills']);

    gulp.watch(['pug-scss/pages/contact/*.pug',
        'pug-scss/pages/contact/sections/**/pug/*.pug'], ['views-contact']);

    /* end of pug --------------------------------------------------------*/


    // gulp.watch(['*.html', '**/**/**/*.html'], ['bs-reload']);
});

//Run tasks on default
gulp.task('default', ['serve','views-home','views-about','views-skills','views-contact','styles','bs-reload','watch']);
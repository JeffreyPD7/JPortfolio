var gulp = require('gulp');
var compass = require('gulp-compass');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var autoprefixer = require('gulp-autoprefixer');

//Browser-Sync
gulp.task('serve',['compass'],function() {

	browserSync.init({
		server: "./"
	});


	gulp.watch(['scss/*.scss','scss/**/*.scss','scss/**/**/*.scss','scss/**/**/**/*.scss','scss/**/**/**/**/*.scss'],['compass']);


	gulp.watch('*.html', '**/**/**/*.html').on('change',browserSync.reload);
});

// //Setting Sass for Main Template
gulp.task('compass', function() {
    gulp.src('scss/main.stl.scss')
        .pipe(compass({
            config_file: './config.rb',
            css: './app/css/',
            sass: './scss'
        }))
        .on('error', function(error) {
            // Would like to catch the error here
            console.log(error);
            this.emit('end');
        })
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./app/main/css/'))
        .pipe(browserSync.reload({stream: true}));
});



// Setting Sass for Sign Up Template
// gulp.task('compass', function() {
//     gulp.src('scss/pages/signup/signup.stl.scss')
//         .pipe(compass({
//             config_file: './config.rb',
//             css: './app/css/',
//             sass: './scss/pages/signup'
//         }))
//         .on('error', function(error) {
//             // Would like to catch the error here
//             console.log(error);
//             this.emit('end');
//         })
//         .pipe(gulp.dest('./app/pages/signup/css/'))
//         .pipe(browserSync.reload({stream: true}));
// });


//Run tasks on default
gulp.task('default', ['serve']);

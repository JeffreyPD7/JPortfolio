var gulp = require('gulp');

//Gulp Plugins
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var autoprefixer = require('gulp-autoprefixer');
var cleanCSS = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var pug = require('gulp-pug');
var gulpif = require('gulp-if');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var inject = require('gulp-inject');
var nodemon = require('gulp-nodemon');
var util = require('gulp-util');
var taskListing = require('gulp-task-listing');
var imagemin = require('gulp-imagemin');
var concat = require('gulp-concat');
var pugLint = require('gulp-pug-lint');
var stripCssComments = require('gulp-strip-css-comments');
// var csso = require('gulp-csso');
// var angularTemplatecache = require('gulp-angular-templatecache');
// var minify = require('gulp-htmlmin');

// Non-gulp Plugins
var browserSync = require('browser-sync');
var merge = require('merge-stream');
var args = require('yargs').argv;
var del = require('del');
// var sassdoc = require('sassdoc');

// Configs
var config = require('./gulp.config')();
var port = process.env.PORT || config.defaultPort;

/**
 * NOTE: Still currently working on new code template for gulp; both old and new are active.
 * Difference between them is the old code running by default under gulp, and the new code running
 * by their task names and through a server
 */

////////////////////////////////////////////////////////////////////////////////////////////////////
// OLD CODE without Server & Default Task //////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

//Browser-Sync
gulp.task('serve', function () {
    browserSync({
        server: {
            baseDir: './build/'
        }
    });
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});


// Pug ////////////////////////////////////////////////////
function pugTask(pugSrc, pugBase) {
    log('Compiling About PUG --> HTML');

    return gulp
        .src([pugSrc], {base: pugBase})
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(pugLint())
        .pipe(pug())
        // .pipe(pug({
        //     pretty: true
        // }))
        .pipe(gulp.dest('./build/pages'))
        .on('end', function() {
           browserSync.reload();
        });
}


// INDEX ------------------------------------------
gulp.task('view-index', function buildHTML() {
    log('Compiling Index PUG --> HTML');

    return gulp
        .src('./app/*.pug', {base: './app/'})
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(pugLint())
        .pipe(pug())
        // .pipe(pug({
        //     pretty: true
        // }))
        .pipe(gulp.dest('./build/'));
});

// HOME ------------------------------------------
gulp.task('view-home', function buildHTML() {
    log('Compiling Home PUG --> HTML');

    return gulp
        .src('./app/pages/home/*.pug', {base: './app/pages/home/'})
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(pugLint())
        .pipe(pug())
        // .pipe(pug({
        //     pretty: true
        // }))
        .pipe(gulp.dest('./build/pages/'));
});

// ABOUT ------------------------------------------
// gulp.task('view-about', function buildHTML() {
//     log('Compiling About PUG --> HTML');
//
//     return gulp
//         .src('./app/pages/about/*.pug', {base: './app/pages/about/'})
//         .pipe(plumber({
//             errorHandler: function (error) {
//                 console.log(error.message);
//                 this.emit('end');
//             }
//         }))
//         .pipe(pugLint())
//         .pipe(pug())
//         // .pipe(pug({
//         //     pretty: true
//         // }))
//         .pipe(gulp.dest('./build/pages/'));
// });

// SKILLS ------------------------------------------
gulp.task('view-skills', function buildHTML() {
    log('Compiling Skills PUG --> HTML');

    return gulp
        .src('./app/pages/skills/*.pug', {base: './app/pages/skills/'})
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(pugLint())
        .pipe(pug())
        // .pipe(pug({
        //     pretty: true
        // }))
        .pipe(gulp.dest('./build/pages/'));
});

// CONTACT ----------------------------------------
gulp.task('view-contact', function buildHTML() {
    log('Compiling Contact PUG --> HTML');

    return gulp
        .src('./app/pages/contact/*.pug', {base: './app/pages/contact/'})
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(pugLint())
        .pipe(pug())
        // .pipe(pug({
        //     pretty: true
        // }))
        .pipe(gulp.dest('./build/pages/'));
});

// PROJECTS ----------------------------------------
gulp.task('view-projects', function buildHTML() {
    log('Compiling Projects PUG --> HTML');

    return gulp
        .src('./app/pages/projects/*.pug', {base: './app/pages/projects/'})
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(pugLint())
        .pipe(pug())
        // .pipe(pug({
        //     pretty: true
        // }))
        .pipe(gulp.dest('./build/pages/'));
});


/* end of pug ----------------------------------------------*/


//Setting Sass for Master Template
gulp.task('styles', function () {
    log('Compiling SCSS --> CSS');

    return gulp
        .src(config.scss)
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions', '> 5%'],
            cascade: false
        }))
        .pipe(stripCssComments())
        // .pipe(sassdoc())
        // .pipe(csso())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/css/'))
        // .pipe(browserSync.reload({stream: true}))
        .pipe(browserSync.stream())
        .on('end', function () {
            log('CSS Compiled!');
        });

});

// Scripts
gulp.task('scripts', function () {
    var appScript = gulp.src('./app/*.js', ['./app/'])
        .pipe(gulp.dest('./build/scripts/'));

    var servicesScript = gulp.src('./app/services/*.js', ['./app/services/'])
        .pipe(gulp.dest('./build/scripts/'));

    var homeScript = gulp.src('./app/pages/home/scripts/*.js',
        ['./app/pages/home/scripts/'])
        .pipe(gulp.dest('./build/scripts/'));

    var aboutScript = gulp.src('./app/pages/about/scripts/*.js',
        ['./app/pages/about/scripts/'])
        .pipe(gulp.dest('./build/scripts/'));

    var skillsScript = gulp.src('./app/pages/skills/scripts/*.js',
        ['./app/pages/skills/scripts/'])
        .pipe(gulp.dest('./build/scripts/'));

    var contactScript = gulp.src('./app/pages/contact/scripts/*.js',
        ['./app/pages/contact/scripts/'])
        .pipe(gulp.dest('./build/scripts/'));

    var projectsScript = gulp.src('./app/pages/projects/scripts/*.js',
        ['./app/pages/projects/scripts/'])
        .pipe(gulp.dest('./build/scripts/'));

    return merge(appScript, servicesScript, homeScript, aboutScript, skillsScript, contactScript, projectsScript);

});

// Watching files for changes
gulp.task('watch', function () {
    gulp.watch([config.watchSCSS], ['styles']);

    gulp.watch('./*.js', ['vet']);
    gulp.watch('app/assets/images/*', ['images']);
    gulp.watch('app/assets/fonts/*', ['fonts']);
    gulp.watch(['app/*.js', 'app/services/*.js', 'app/pages/**/scripts/*.js'], ['scripts']);
});

//Watching Pug
// gulp.task('watchPug', function () {
//     log('Watching All Pugs');

    // gulp.watch([config.pug.about.watch], function () {
    //     pugTask(config.pug.about.src, config.pug.about.base);
    // });

    // gulp.watch([config.watchPug.index], ['view-index']);
    // gulp.watch([config.watchPug.home], ['view-home']);
    // gulp.watch([config.watchPug.about], ['view-about']);
    // gulp.watch([config.watchPug.skills], ['view-skills']);
    // gulp.watch([config.watchPug.contact], ['view-contact']);
    // gulp.watch([config.watchPug.projects], ['view-projects']);
// });


//Run tasks on default
// gulp.task('default', ['serve','vet','views-index','views-home','views-about',
//     'views-skills','views-contact','views-projects','styles','images','fonts','scripts',
//     'bs-reload','watch']);


////////////////////////////////////////////////////////////////////////////////////////////////////
// NEW CODE with Server & Tasks ////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

gulp.task('help', taskListing);
gulp.task('default', ['help']);

// Copying and Compressing Images to Build Folder
gulp.task('images', ['clean-images'], function () {
    log('Copying and compressing the images');

    return gulp
        .src(config.images)
        .pipe(imagemin({optimizationLevel: 4}))
        .pipe(gulp.dest(config.build + 'assets/images'));
});

// Copying Fonts to Build Folder
gulp.task('fonts', ['clean-fonts'], function () {
    log('Copying fonts');

    return gulp
        .src(config.fonts)
        .pipe(gulp.dest(config.build + 'assets/fonts'));
});

gulp.task('clean', function () {
    var delconfig = [].concat([config.build + 'assets/**',
        config.build + '!assets/'], config.css);
    log('Cleaning: ' + util.colors.blue(delconfig));
    del(delconfig);
    log('Cleaning Done');
});

gulp.task('clean-fonts', function () {
    clean(config.build + 'assets/fonts/**/*.*');
    log('Fonts Deleted');
});

gulp.task('clean-images', function () {
    clean(config.build + 'assets/images/**/*.*');
    log('Images Deleted');
});

gulp.task('clean-styles', function () {
    clean(config.css);
    log('Styles Deleted');
});

// Vetting JS
gulp.task('vet', function () {
    log('Analizing source with JSHint and JSCS');

    return gulp
        .src(config.alljs)
        .pipe(gulpif(args.verbose, print()))
        .pipe(jscs())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish', {verbose: true}))
        .pipe(jshint.reporter('fail'));
});

// Injecting Dependencies in index.pug
gulp.task('wiredep', function () {
    log('Wire up the bower css js and our app js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp
        .src(config.index)
        .pipe(wiredep(options))
        .pipe(inject(gulp.src(config.injectSrc), config.injectOptions))
        .pipe(gulp.dest(config.app));
});

// Injecting CSS in index.pug
gulp.task('inject', ['wiredep', 'styles'], function () {
    log('Wire up the app css into the html, and call wiredep ');

    return gulp
        .src(config.index)
        .pipe(inject(gulp.src(config.css), config.injectOptions))
        .pipe(gulp.dest(config.app));
});

//Starting Server
gulp.task('serve-dev', ['inject'], function () {
    var isDev = true;

    var nodeOptions = {
        script: config.nodeServer,
        delayTime: 1,
        env: {
            'PORT': port,
            'NODE_ENV': isDev ? 'dev' : 'build'
        },
        watch: [config.server]
    };

    return nodemon(nodeOptions)
        .on('restart', function (ev) {
            log('*** nodemon restarted');
            log('files changed on restart:\n' + ev);
            setTimeout(function () {
                browserSync.notify('reloading now ...');
                browserSync.reload({stream: false});
            }, config.browserReloadDelay);
        })
        .on('start', function () {
            log('*** nodemon started');
            startBrowserSync();
        })
        .on('crash', function () {
            log('*** nodemon crashed: script crashed for some reason');
        })
        .on('exit', function () {
            log('*** nodemon exited cleanly');
        });
});


////////////////////////////////////////////////////////////////////////////////////////////////////
// Functions ///////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

// Cleaning Files
function clean(path) {
    log('Cleaning: ' + util.colors.blue(path));
    del(path);
}

// Watching on chage
function changeEvent(event) {
    var srcPattern = new RegExp('/.*(?=/' + config.source + ')/');
    log('File ' + event.path.replace(srcPattern, '') + ' ' + event.type);
}

// Starting BrowserSync
function startBrowserSync() {
    if (args.nosync || browserSync.active) {
        return;
    }

    log('Starting browser-sync on port ' + port);

    gulp.watch([config.watchSCSS], ['styles'])
        .on('change', function (event) {
            changeEvent(event);
        });

    /* Pug Content --------------------------------------------------------*/
    gulp.watch([config.watchPug.index], ['view-index']).on('change', function (event) {
        changeEvent(event);
    });
    gulp.watch([config.watchPug.home], ['view-home']).on('change', function (event) {
        changeEvent(event);
    });


    gulp.watch([config.pug.about.watch], function () {
        pugTask(config.pug.about.src, config.pug.about.base).on('change', function (event) {
            changeEvent(event);
        });
    });


    gulp.watch([config.watchPug.skills], ['view-skills']).on('change', function (event) {
        changeEvent(event);
    });
    gulp.watch([config.watchPug.contact], ['view-contact']).on('change', function (event) {
        changeEvent(event);
    });
    gulp.watch([config.watchPug.projects], ['view-projects']).on('change', function (event) {
        changeEvent(event);
    });
    /* end of pug --------------------------------------------------------*/

    // if (isDev) {
    //     gulp.watch([config.less], ['styles'])
    //         .on('change', changeEvent);
    // } else {
    //     gulp.watch([config.less, config.js, config.html], ['optimize', browserSync.reload])
    //         .on('change', changeEvent);
    // }

    var options = {
        proxy: 'localhost:' + port,
        port: 3000,
        files: [
            '!' + config.app + '**/*.*',
            '!' + config.watchSCSS,
            '!' + config.watchPug,
            config.build + '*.html',
            '!' + config.css + '*.css'
        ],
        ghostMode: {
            clicks: true,
            location: false,
            forms: true,
            scroll: true
        },
        injectChanges: true,
        logFileChanges: true,
        logLevel: 'debug',
        logPrefix: 'gulp-patterns',
        notify: true,
        reloadDelay: 0 //1000
    };

    // if (specRunner) {
    //     options.startPath = config.specRunnerFile;
    // }

    browserSync(options);
}


// Message Logger
function log(msg) {
    if (typeof(msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                util.log(util.colors.blue(msg[item]));
            }
        }
    } else {
        util.log(util.colors.blue(msg));
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////
// Online tasks, but not under use for certain errors //////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

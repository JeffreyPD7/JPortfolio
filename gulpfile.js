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

// Pug
function pugTask(pugSrc, pugBase, pugDest) {
    log('Compiling PUG --> HTML');

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
        .pipe(gulp.dest(pugDest))
        .on('end', function () {
            browserSync.reload();
        });
}

// Watching Pug
gulp.task('watch-pug', function () {
    log('Watching Pug');

    gulp.watch([config.pug.index.watch], function () {
        pugTask(config.pug.index.src, config.pug.index.base, config.pug.index.dest)
            .on('change', function (event) {
                changeEvent(event);
            });
    });

    gulp.watch([config.pug.home.watch], function () {
        pugTask(config.pug.home.src, config.pug.home.base, config.pug.home.dest)
            .on('change', function (event) {
                changeEvent(event);
            });
    });

    gulp.watch([config.pug.about.watch], function () {
        pugTask(config.pug.about.src, config.pug.about.base, config.pug.about.dest)
            .on('change', function (event) {
                changeEvent(event);
            });
    });

    gulp.watch([config.pug.skills.watch], function () {
        pugTask(config.pug.skills.src, config.pug.skills.base, config.pug.skills.dest)
            .on('change', function (event) {
                changeEvent(event);
            });
    });

    gulp.watch([config.pug.contact.watch], function () {
        pugTask(config.pug.contact.src, config.pug.contact.base, config.pug.contact.dest)
            .on('change', function (event) {
                changeEvent(event);
            });
    });

    gulp.watch([config.pug.projects.watch], function () {
        pugTask(config.pug.projects.src, config.pug.projects.base, config.pug.projects.dest)
            .on('change', function (event) {
                changeEvent(event);
            });
    });
});

// Build Pug
gulp.task('build-pug', function () {
    log('Compiling and Compressing All Pugs to Build Dir');

    pugTask(config.pug.index.src, config.pug.index.base);
    pugTask(config.pug.home.src, config.pug.home.base);
    pugTask(config.pug.about.src, config.pug.about.base);
    pugTask(config.pug.skills.src, config.pug.skills.base);
    pugTask(config.pug.contact.src, config.pug.contact.base);
    pugTask(config.pug.projects.src, config.pug.projects.base);

    log('build-pug Done');
});

// SCSS
gulp.task('styles', function () {
    log('Compiling SCSS --> CSS');
    var autoprefixBrowsers = ['> 1%', 'last 2 versions', 'firefox >= 4', 'safari 7',
        'safari 8', 'IE 8', 'IE 9', 'IE 10', 'IE 11'];

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
            browsers: [autoprefixBrowsers],
            cascade: false
        }))
        // .pipe(autoprefixer({
        //     browsers: ['last 2 versions', '> 5%'],
        //     cascade: false
        // }))
        .pipe(stripCssComments())
        // .pipe(sassdoc())
        // .pipe(csso())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/css/'))
        .pipe(browserSync.stream())
        .on('end', function () {
            log('CSS Compiled!');
        });

});

// Scripts Process
function scriptsTask(scriptSrc, scriptBase) {
    log('Making changes to Scripts');

    return gulp
        .src([scriptSrc], {base: scriptBase})
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }
        }))
        .pipe(gulp.dest('./build/scripts'))
        .on('end', function () {
            browserSync.reload();
        });
}

// Watching Scripts
gulp.task('watch-scripts', function () {
    log('Watching Scripts');

    gulp.watch([config.scripts.app.watch], function () {
        scriptsTask(config.scripts.app.src, config.scripts.app.base).on('change', function (event) {
            changeEvent(event);
        });
    });

    gulp.watch([config.scripts.service.watch], function () {
        scriptsTask(config.scripts.service.src, config.scripts.service.base).on('change', function (event) {
            changeEvent(event);
        });
    });

    gulp.watch([config.scripts.home.watch], function () {
        scriptsTask(config.scripts.home.src, config.scripts.home.base).on('change', function (event) {
            changeEvent(event);
        });
    });

    gulp.watch([config.scripts.about.watch], function () {
        scriptsTask(config.scripts.about.src, config.scripts.about.base).on('change', function (event) {
            changeEvent(event);
        });
    });

    gulp.watch([config.scripts.skills.watch], function () {
        scriptsTask(config.scripts.skills.src, config.scripts.skills.base).on('change', function (event) {
            changeEvent(event);
        });
    });

    gulp.watch([config.scripts.contact.watch], function () {
        scriptsTask(config.scripts.contact.src, config.scripts.contact.base).on('change', function (event) {
            changeEvent(event);
        });
    });

    gulp.watch([config.scripts.projects.watch], function () {
        scriptsTask(config.scripts.projects.src, config.scripts.projects.base).on('change', function (event) {
            changeEvent(event);
        });
    });
});

// Compiling Scripts to Build Dir
gulp.task('build-scripts', function () {
    log('Compiling and Compressing All Scripts to Build Dir');

    scriptsTask(config.scripts.app.src, config.scripts.app.base);
    scriptsTask(config.scripts.service.src, config.scripts.service.base);
    scriptsTask(config.scripts.home.src, config.scripts.home.base);
    scriptsTask(config.scripts.about.src, config.scripts.about.base);
    scriptsTask(config.scripts.skills.src, config.scripts.skills.base);
    scriptsTask(config.scripts.contact.src, config.scripts.contact.base);
    scriptsTask(config.scripts.projects.src, config.scripts.projects.base);

    log('build-scripts Done');
});

// Watching files for changes
gulp.task('watch', function () {
    gulp.watch([config.watchSCSS], ['styles']);

    gulp.watch('./*.js', ['vet']);
    gulp.watch('app/assets/images/*', ['images']);
    gulp.watch('app/assets/fonts/*', ['fonts']);
    gulp.watch(['app/*.js', 'app/services/*.js', 'app/pages/**/scripts/*.js'], ['scripts']);
});

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
gulp.task('serve-dev', ['inject','watch-pug','watch-scripts'], function () {
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

    /* Watch Pug Content --------------------------------------------------------*/

    // gulp.watch([config.pug.index.watch], function () {
    //     pugTask(config.pug.index.src, config.pug.index.base).on('change', function (event) {
    //         changeEvent(event);
    //     });
    // });
    //
    // gulp.watch([config.pug.home.watch], function () {
    //     pugTask(config.pug.home.src, config.pug.home.base).on('change', function (event) {
    //         changeEvent(event);
    //     });
    // });
    //
    // gulp.watch([config.pug.about.watch], function () {
    //     pugTask(config.pug.about.src, config.pug.about.base).on('change', function (event) {
    //         changeEvent(event);
    //     });
    // });
    //
    // gulp.watch([config.pug.skills.watch], function () {
    //     pugTask(config.pug.skills.src, config.pug.skills.base).on('change', function (event) {
    //         changeEvent(event);
    //     });
    // });
    //
    // gulp.watch([config.pug.contact.watch], function () {
    //     pugTask(config.pug.contact.src, config.pug.contact.base).on('change', function (event) {
    //         changeEvent(event);
    //     });
    // });
    //
    // gulp.watch([config.pug.projects.watch], function () {
    //     pugTask(config.pug.projects.src, config.pug.projects.base).on('change', function (event) {
    //         changeEvent(event);
    //     });
    // });

    /* end of pug --------------------------------------------------------*/

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
// Deprecated tasks ////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

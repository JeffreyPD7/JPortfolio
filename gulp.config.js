module.exports = function () {
    // var appPagesDir = './app/pages/';

    var appDir = './app/';
    var assetsDir = appDir + '/assets/';
    var buildDir = './build/';

    var config = {

        /**
         * File paths
         */

        app: appDir,

        alljs: [ // Vetting all js
            './*.js',
            './server/*.js'
        ],
        build: buildDir,
        buildAssets: buildDir + 'assets/',
        css: buildDir + 'css/master.css',
        fonts: assetsDir + 'fonts/**/*.*',
        images: assetsDir + 'images/**/*.*',
        index: appDir + 'index.pug',
        server: './server/',
        scss: appDir + 'master.scss',

        pug: {
            index: {
                src: './app/*.pug',
                base: './app/',
                watch: [
                    'app/*.pug',
                    'app/regions/*.pug',
                    'app/regions/**/*.pug'
                ],
                dest: './build'
            },
            home: {
                src: './app/pages/home/*.pug',
                base: './app/pages/home/',
                watch: [
                    'app/pages/home/*.pug',
                    'app/pages/home/sections/**/pug/*.pug'
                ],
                dest: './build/pages'
            },
            about: {
                src: 'app/pages/about/*.pug',
                base: './app/pages/about/',
                watch: [
                    'app/pages/about/*.pug',
                    'app/pages/about/sections/**/pug/*.pug'
                ],
                dest: './build/pages'
            },
            skills: {
                src: './app/pages/skills/*.pug',
                base: './app/pages/skills/',
                watch: [
                    'app/pages/skills/*.pug',
                    'app/pages/skills/sections/**/pug/*.pug'
                ],
                dest: './build/pages'
            },
            contact: {
                src: './app/pages/contact/*.pug',
                base: './app/pages/contact/',
                watch: [
                    'app/pages/contact/*.pug',
                    'app/pages/contact/sections/**/pug/*.pug'
                ],
                dest: './build/pages'
            },
            projects: {
                src: './app/pages/projects/*.pug',
                base: './app/pages/projects/',
                watch: [
                    'app/pages/projects/*.pug',
                    'app/pages/projects/sections/**/pug/*.pug'
                ],
                dest: './build/pages'
            }
        },

        scripts: {
            app: {
                src: './app/app.js',
                base: './app/',
                watch: './app/app.js',
                dest: ''
            },
            service: {
                src: './app/services/*.js',
                base: './app/services/',
                watch: './app/services/*.js',
                dest: ''
            },
            home: {
                src: './app/pages/home/scripts/*.js',
                base: './app/pages/home/scripts/',
                watch: './app/pages/home/scripts/*.js',
                dest: ''
            },
            about: {
                src: './app/pages/about/scripts/*.js',
                base: './app/pages/about/scripts/',
                watch: './app/pages/about/scripts/*.js',
                dest: ''
            },
            skills: {
                src: './app/pages/skills/scripts/*.js',
                base: './app/pages/skills/scripts/',
                watch: './app/pages/skills/scripts/*.js',
                dest: ''
            },
            contact: {
                src: './app/pages/contact/scripts/*.js',
                base: './app/pages/contact/scripts/',
                watch: './app/pages/contact/scripts/*.js',
                dest: ''
            },
            projects: {
                src: './app/pages/projects/scripts/*.js',
                base: './app/pages/projects/scripts/',
                watch: './app/pages/projects/scripts/*.js',
                dest: ''
            }
        },

        regions: [
            './app/regions/app/app-links.pug',
            './app/regions/app/app-scripts.pug',
            './app/regions/bower-lib/bower-lib.pug',
            './app/regions/bower-lib/bower-scripts.pug'
        ],

        /**
         * Files Under Watch
         */
        watchSCSS: [
            'app/*.scss',
            'app/modules/*.scss',
            'app/modules/**/*.scss',
            'app/smacss/*.scss',
            'app/smacss/**/*.scss',
            'app/smacss/**/**/*.scss',
            'app/pages/**/*.scss',
            'app/pages/**/global/*.scss',
            'app/pages/**/sections/*.scss',
            'app/pages/**/sections/**/*.scss'
        ],
        watchPug: {
            index: [
                'app/*.pug',
                'app/regions/*.pug',
                'app/regions/**/*.pug'
            ],
            home: [
                'app/pages/home/*.pug',
                'app/pages/home/sections/**/pug/*.pug'
            ],
            about: [
                'app/pages/about/*.pug',
                'app/pages/about/sections/**/pug/*.pug'
            ],
            skills: [
                'app/pages/skills/*.pug',
                'app/pages/skills/sections/**/pug/*.pug'
            ],
            contact: [
                'app/pages/contact/*.pug',
                'app/pages/contact/sections/**/pug/*.pug'
            ],
            projects: [
                'app/pages/projects/*.pug',
                'app/pages/projects/sections/**/pug/*.pug'
            ]
        },


        /**
         * Bower and NPM locations
         */
        bower: {
            json: require('./bower.json'),
            directory: './build/libs/',
            ignorePath: '../build'
        },

        /**
         * browser sync
         */
        browserReloadDelay: 1000,


        /**
         * This js is for wiredep, and currently not under use for it was printing root src location
         * on inject:js. Also discontinued using because all links will be erased after every refresh
         * or save on pug.
         */
        injectSrc: [
            './build/scripts/*.js',
            '!build/scripts/app.js'
        ],

        injectOptions: {
            ignorePath: '/build'
        },

        /**
         * Node settings
         */
        defaultPort: 5000,
        nodeServer: './server/server.js'
    };


    /**
     * Configs
     */
    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };

        return options;
    };

    return config;
};




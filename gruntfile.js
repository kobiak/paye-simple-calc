'use strict';

module.exports = function (grunt) {

    const sass = require('node-sass');

    grunt.initConfig({

        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['js/*/*.js'],
                dest: 'build/js/build.js',
            },
        },

        uglify: {
            build: {
                options: {
                    sourceMap: false,
                    compress: {
                        drop_console: true
                    }
                },
                files: {
                    'build/js/build.min.js': ['build/js/build.js']
                }
            }
        },

        sass: {
            options: {
                implementation: sass,
                sourceMap: false
            },
            dist: {

                files: [{
                    expand: true,
                    cwd: 'scss',
                    src: ['*.scss'],
                    dest: 'build/css',
                    ext: '.min.css'
				}]
            }
        },

        postcss: {
            options: {
                map: false,

                processors: [
                    //require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer')({
                        browsers: 'last 2 versions'
                    }), // add vendor prefixes
                    require('cssnano')() // minify the result
                ]
            },
            dist: {
                src: 'build/css/*.css'
            }
        },

        copy: {
            main: {
                files: [{
                    expand: true,
                    src: ['index.html'],
                    dest: 'build/',
                    filter: 'isFile'
                }, ],
            }
        },


        watch: {
            js: {
                files: ['js/**/*.js'],
                tasks: ['js']
            },
            styles: {
                files: ['scss/*.scss'],
                tasks: ['css']
            },
        }

    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['js', 'css', 'copy']);
    grunt.registerTask('js', ['concat', 'uglify']);
    grunt.registerTask('css', ['sass', 'postcss']);

}

'use strict';

module.exports = function (grunt) {

    grunt.initConfig({

        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['js/*/*.js'],
                dest: 'dist/js/build.js',
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
                    'dist/js/build.min.js': ['dist/js/build.js'],
                }
            }
        },

        sass: {
            dist: {
                options: {
                    sourceMap: false
                },
                files: [{
                    expand: true,
                    cwd: 'scss',
                    src: ['*.scss'],
                    dest: 'dist/css',
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
                src: 'dist/css/*.css'
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

    grunt.registerTask('default', ['js', 'css']);
    grunt.registerTask('js', ['concat', 'uglify']);
    grunt.registerTask('css', ['sass', 'postcss']);

}

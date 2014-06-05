module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		/**
		 * Compile SASS
		 */
		watch: {
			sass: {
				files: ['source/assets/scss/**/*.{scss,sass}'],
				tasks: ['sass-compile']
			}
		},

		sass: {
			dist: {
				options: {
					includePaths: [
						'bower_components/compass-mixins/lib',
						'bower_components/bourbon/app/assets/stylesheets',
						'bower_components/foundation/scss',
						'source/assets/scss/*.{scss,sass}'
					],
					outputStyle: 'nested' // 'nested', 'expanded', 'compact', 'compressed'
				},
				files: {
					'output/assets/css/app.css': 'source/assets/scss/app.scss',
					'output/assets/css/pages/home.css': 'source/assets/scss/pages/home.scss',
					'output/assets/css/pages/about.css': 'source/assets/scss/pages/about.scss'
				}
			}
		},

        /**
         * Copy files
         */
         copy: {
            main: {
                files: [
                    // Bower components (leaving the cruft behind...)
                    {
                        expand: true,
                        flatten: true,
                        src: [
                            'bower_components/es5-shim/es5-shim.js',
                            'bower_components/json3/lib/json3.min.js',
                            'bower_components/modernizr/modernizr.js',
                            'bower_components/jquery/dist/jquery.js',
                            'bower_components/fastclick/lib/fastclick.js',
                            'bower_components/jquery.cookie/jquery.cookie.js',
                            'bower_components/jquery-placeholder/jquery.placeholder.js',
                            'bower_components/foundation/js/foundation.js',
                            'bower_components/jquery.easing/js/jquery.easing.min.js'
                        ],
                        dest: 'output/assets/bower/'
                    },

                    // App javascript
                    {
                        expand: true,
                        flatten: false,
                        cwd: 'source/assets/js',
                        src: '**/*',
                        dest: 'output/assets/js/'
                    },

                    // Images
                    {
                        expand: true,
                        flatten: false,
                        cwd: 'source/assets/images',
                        src: '**/*',
                        dest: 'output/assets/images/'
                    },

                    // Fonts
                    {
                        expand: true,
                        flatten: false,
                        cwd: 'source/assets/font',
                        src: '**/*',
                        dest: 'output/assets/font/'
                    },

                    // Videos
                    {
                        expand: true,
                        flatten: false,
                        cwd: 'source/assets/videos',
                        src: '**/*',
                        dest: 'output/assets/videos/'
                    }
                ]
            }
        },

		/**
		 * Assemble
		 */
        assemble: {
            options: {
                assets: 'output/assets',
                layout: ['source/layouts/default.hbs'],
                partials: [
                    'source/partials/global/**/*.hbs',
                    'source/partials/svg/**/*.svg'],
                // plugins: ['permalinks'],
                // data: ['data/*.{json,yml}']
            },
            index: {
                options: {
                    partials: [
                        'source/partials/home/**/*.hbs'
                    ],
                },
                files: [{
                    expand: true,
                    cwd: 'source/pages/',
                    src: '**/index.hbs',
                    dest: 'output/'
                }],
            },
            site: {
                files: [{
                    expand: true,
                    cwd: 'source/pages/',
                    src: ['**/*.hbs', '!**/index.hbs' ],
                    dest: 'output/',
                    ext: '/index.html',
                }]
            }
        },

	});

	// Tell Grunt what plugins to use
	grunt.loadNpmTasks('grunt-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('assemble');

	// Tell Grunt which tasks to run on cl 'grunt'
	grunt.registerTask('default', ['sass:dist', 'copy', 'assemble']);
	grunt.registerTask('sass-watch', ['watch:sass']);
};

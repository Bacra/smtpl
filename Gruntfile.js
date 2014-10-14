module.exports = function (grunt)
{
	grunt.initConfig(
	{
		pkg: grunt.file.readJSON('package.json'),
		meta: {
			banner: '/*!<%= pkg.name %> - Template Engine | <%= pkg.homepage %>*/\n'
		},
		concat: {
			options: {
				banner: '<%= meta.banner %>',
				separator: ''
			},
			task: {
				src: ['src/intro.js', 'src/smtpl.js', 'src/main.js', 'src/outro.js'],
				dest: 'dist/smtpl-debug.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= meta.banner %>'
			},
			task: {
				src: 'dist/smtpl-debug.js',
				dest: 'dist/smtpl.js'
			}
		},
		jshint: {
			files: [
				'src/smtpl.js',
			],
			options: {
				eqeqeq: true,
				immed: true,
				newcap: true,
				noarg: true,
				sub: true,
				eqnull: true
			}
		},
		nodeunit: {
			all: ['test/test_*.js']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-nodeunit');

	grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
	grunt.registerTask('test', ['default', 'nodeunit']);
};
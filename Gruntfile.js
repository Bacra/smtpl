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
			'native': {
				src: ['src/intro.js', 'src/smtpl.js', 'src/main.js', 'src/outro.js'],
				dest: 'dist/smtpl-debug.js'
			},
			plugin: {
				src: ['src/intro.js', 'src/smtpl.js', 'src/main.js', 'src/plugin-*.js', 'src/outro.js'],
				dest: 'dist/smtpl-plugin-debug.js'
			}
		},
		uglify: {
			options: {
				banner: '<%= meta.banner %>'
			},
			'native': {
				src: 'dist/smtpl-debug.js',
				dest: 'dist/smtpl.js'
			},
			plugin: {
				src: 'dist/smtpl-plugin-debug.js',
				dest: 'dist/smtpl-plugin.js'
			}
		},
		jshint: {
			src_dir: ['src/smtpl.js'],
			dist_dir: ['dist/*-debug.js'],
			options: {
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

	grunt.registerTask('default', ['jshint:src_dir', 'concat', 'jshint:dist_dir', 'uglify']);
	grunt.registerTask('test', ['default', 'nodeunit']);
};

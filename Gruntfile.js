module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jasmine: {
      unmin: {
        src: 'cache.js',
        options: {
          specs: 'test/cache-spec.js'
        }
      },
      min: {
        src: 'cache.min.js',
        options: {
          specs: 'test/cache-spec.js'
        }
      }
    },

    jshint: {
      all: ['bower.json', 'package.json', 'cache.js'],
      options: {
        "curly": true,
        "eqeqeq": true,
        "immed": true,
        "latedef": true,
        "newcap": true,
        "noarg": true,
        "sub": true,
        "undef": true,
        "boss": true,
        "eqnull": true,
        "globals": {
          "jQuery": true,
          "document": true
        }
      }
    },
    uglify: {
      options: {
        report: 'gzip'
      },
      std: {
        files: {
          'cache.min.js' : 'cache.js'
        }
      }
    }
  });

  // Default task.
  grunt.registerTask('default', ['jshint', 'jasmine:unmin', 'uglify', 'jasmine:min']);

  grunt.registerTask('test', ['jshint', 'jasmine']);
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};

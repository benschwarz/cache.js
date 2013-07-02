module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jasmine: {
      all: {
        src: 'cache.js',
        options: {
          specs: 'test/cache-spec.js'
        }
      }
    },

    jshint: {
      all: ['cache.js'],
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
  grunt.registerTask('default', ['jshint', 'jasmine', 'uglify']);

  grunt.registerTask('travis', ['jshint', 'jasmine']);
  require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);
};

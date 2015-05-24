'use strict';

var LIVERELOAD_PORT = 35729;

// lrSnippet = live-reload middleware
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var serveStatic = require('serve-static');

module.exports = function (grunt) {
  require('load-grunt-tasks')(grunt);
  grunt.initConfig({
    clean: {
      server: '.tmp'
    },
    copy: {
      server: {files: {'.tmp/scripts/browser-polyfill.js': 'node_modules/babel-core/browser-polyfill.js'}}
    },
    connect: {
      server: {
        options: {
          middleware: [
            lrSnippet, // inject the live-reload script tag, if appropriate
            serveStatic('.tmp'), // First, serve files from .tmp, if possible
            serveStatic('app'), // then, serve from app (raw)
            ['/bower_components', serveStatic('bower_components')] // then serve bower_components
          ]
        }
      }
    },
    babel: {
      options: {
        sourceMap: true,
        modules: 'amd'
      },
      // Transpile all javascript files under app to .tmp/ to be served by connect
      server: {
        files: [
          {
            expand: true,
            cwd: 'app',
            src: ['**/*.js'],
            dest: '.tmp',
            ext: '.js'
          }
        ]
      }
    },
    watch: {
      options: {
        nospawn: true,
        livereload: LIVERELOAD_PORT
      },
      scripts: {
        files: ['app/**/*.js'],
        tasks: ['babel:server']
      },
      html: {
        files: ['app/**/*.html']
      }
    }

  });

  grunt.registerTask('serve', function (target) {
    grunt.task.run([
      'clean:server',
      'babel:server',
      'copy:server',
      'connect:server',
      'watch'
    ]);
  });

};

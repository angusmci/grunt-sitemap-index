/*
 * grunt-sitemap-index
 * https://github.com/angusmci/grunt-sitemap-index
 *
 * Copyright (c) 2015 Angus McIntyre
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var path = require('path');
  var fs = require('fs');
  var zlib = require('zlib');

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('sitemap_index', 'Grunt plugin to generate XML sitemap index files', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      baseurl: 'http://example.com/',
      compress: true
    });

	var xml = getHeader();

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return makeEntry(filepath,options);
      }).join('');

      xml += src;
      xml += getFooter();

      // Compress if required
      
      if (options.compress) {
        var compressed = zlib.gzipSync(xml);
        grunt.file.write(f.dest + ".gz",compressed);
        grunt.log.writeln('Compressed file "' + f.dest + '.gz" created.');
      }
      
      // Otherwise just write out a standard XML file.
      
      else {
        grunt.file.write(f.dest, xml);
        grunt.log.writeln('File "' + f.dest + '" created.');
      }

    });
  });
  
  var getHeader = function() {
    return '<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  };
   
  var getFooter = function() {
    return '</sitemapindex>';
  };
  
  var makeEntry = function(filepath,options) {
    var stat = fs.lstatSync(filepath);
    var timestamp = stat.mtime;
    var url = options.baseurl + filepath;
    return '<sitemap><loc>' + url + '</loc><lastmod>' + timestamp.toISOString() + '</lastmod></sitemap>';

  };

};

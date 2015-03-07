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

	// We need to take into account the 'cwd' attribute of the files object,
	// as users will typically want to change the working directory when
	// using this task.
	
	var cwd_dir = this.files[0].cwd;
	if (cwd_dir === undefined) {
		cwd_dir = "";
	}

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var entry = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(path.join(cwd_dir,filepath))) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return makeEntry(filepath,cwd_dir,options);
      }).join('');

      xml += entry;
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
  
  var makeEntry = function(filepath,cwd_dir,options) {
    var absfilepath = path.join(cwd_dir,filepath);
    var stat = fs.lstatSync(absfilepath);
    var timestamp = stat.mtime;
    var url = options.baseurl + filepath;
    return '<sitemap><loc>' + url + '</loc><lastmod>' + timestamp.toISOString() + '</lastmod></sitemap>';
  };
};

'use strict';

var grunt = require('grunt');
var smi = require('../tasks/sitemap_index.js');
var fs = require('fs');


/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.sitemap_index = {
  setUp: function(done) {
    // setup here if necessary
    done();
  },
  default_options: function(test) {
    test.expect(1);
    test.ok(true,"ok");

    console.log("Inspecting directory");
    var files = fs.readdirSync('tmp/');
    for (var i = 0; i < files.length; i++) {
      var file = files[i];
      console.log("File: " + file);
    }
    console.log("Done inspecting directory");
//    test.doesNotThrow(function() { fs.lstatSync('tmp/default_options.xml.gz'); },
//                      Error,
//                      "file 'tmp/default_options.xml.gz' was not found");

    // var actual = grunt.file.read('tmp/default_options');
    // var expected = grunt.file.read('test/expected/default_options');
    // test.equal(actual, expected, 'should describe what the default behavior is.');

    test.done();
  },
  custom_options: function(test) {
    test.expect(6);

    test.doesNotThrow(function() { fs.lstatSync('tmp/custom_options.xml'); },
                      Error,
                      "file 'tmp/custom_options.xml' was not found");
    var parseString = require('xml2js').parseString;
    var xml = grunt.file.read('tmp/custom_options.xml');
    parseString(xml, function (err, result) {
      var sitemaps = result.sitemapindex.sitemap;
      test.equal(3,sitemaps.length);
      test.equal('http://mydomain.com/test/fixtures/sitemap-01.xml.gz',sitemaps[0].loc);
      test.equal('http://mydomain.com/test/fixtures/sitemap-02.xml.gz',sitemaps[1].loc);
      test.equal('http://mydomain.com/test/fixtures/sitemap-03.xml.gz',sitemaps[2].loc);
      test.equal(24,sitemaps[1].lastmod[0].length);
    });  
    test.done();
  }
};

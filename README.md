# grunt-sitemap-index

> Grunt plugin to generate XML sitemap index files

## Getting Started
This plugin requires Grunt `~0.4.5` and Node `~>0.12.0`.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-sitemap-index --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-sitemap-index');
```

## The "sitemap_index" task

### Overview
In your project's Gruntfile, add a section named `sitemap_index` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  sitemap_index: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.baseurl
Type: `String`
Default value: `http://example.com/`

URL used as a prefix for all URLs included in the sitemap.

#### options.compress
Type: `Boolean`
Default value: `true`

Determines whether the sitemap index file should be compressed using `gzip` or not.

### Usage Examples

#### Default Options

This example shows the default usage, without any options.

Note that you should always specify the `baseurl` option, as otherwise your sitemap will contain incorrect URLs.

```js
grunt.initConfig({
  sitemap_index: {
    options: {},
    files: {
      'dest/sitemap-index.xml': ['src/sitemap-1.xml.gz', 'src/sitemap-2.xml.gz' ],
    },
  },
});
```

#### Custom Options

This example shows how to generate a sitemap index file for the domain 'mydomain.com'. The index file will not be compressed.
 
```js
grunt.initConfig({
  sitemap_index: {
    options: {
      baseurl: 'http://mydomain.com/',
      compress: false,
    },
    files: {
      'dest/sitemap-index.xml': ['src/sitemap-1.xml.gz', 'src/sitemap-2.xml.gz' ],
    },
  },
});
```
#### Changing working directory

Generally, in order to get the correct paths to the sitemaps, you will want to use a file specification that includes the `cwd` element. For example, if your build directory for production is `build/production`, and your sitemaps live in the root of your document tree, you'd want to set `cwd` to `build/production` so that you generate URLs of the form `http://yourdomain.com/your-sitemap.xml.gz`. If you don't use `cwd`, you're likely to end up with a URL like `http://yourdomain.com/build/production/your-sitemap.xml.gz`, which is probably not what you want.  
 
```js
grunt.initConfig({
  sitemap_index: {
    production: {
        options: {
          compress: true,
          baseurl: 'http://mydomain.com/',
        },
        files: [{
          expand: false,
          cwd: 'build/production',
          src: ['map-static.xml.gz','map-dynamic.xml.gz','map-images.xml.gz'],
          dest: 'build/production/map-index.xml'
        }]
      }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_

(function () {
  'use strict';

  var gulp = require('gulp');
  var buffer = require('vinyl-buffer');
  var del = require('del');
  var gutil = require('gulp-util');
  var rename = require('gulp-rename');
  var sourcemaps = require('gulp-sourcemaps');
  var uglify = require('gulp-uglify');
  var webpack = require('gulp-webpack');

  gulp.task('pack', function(){
    return gulp.src('app/CrossRoads.js')
      .pipe(webpack({
        watch: true,
        output: {
          libraryTarget: 'var',
          library: 'CrossRoads'
        },
        module: {
          loaders: [
            {
              test: /\.json$/,
              loader: 'json-loader'
            },
            {
              test: /\.js$/,
              exclude: /node_modules/,
              loader: 'babel-loader',
              query: {
                presets: ['react', 'es2015']
              }
            }
          ]
        },
        node: {
          fs: 'empty'
        }
      }))
      .pipe(rename('client.js'))
      .pipe(gulp.dest('./build'))
      .pipe(rename('client.min.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(uglify())
      .on('error', gutil.log)
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build/'));
  });
})();

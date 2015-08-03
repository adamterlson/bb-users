var gulp = require('gulp');
var stylus = require('gulp-stylus');
var connect = require('gulp-connect');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');

var paths = {
  dist: './dist',
  src: './src/',
  js: './src/js/',
  css: './src/css/'
};

gulp.task('js', function () {
  var bundler = watchify(browserify(paths.js + 'index.js', { debug: true }).transform(babel));

  function rebundle() {
    bundler.bundle()
      .on('error', function(err) { console.error(err); this.emit('end'); })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest(paths.dist));
  }

  bundler.on('update', function() {
    rebundle();
  });

  rebundle();
});

gulp.task('stylus', function() {
  gulp.src(paths.css + 'main.styl')
    .pipe(stylus())
    .pipe(gulp.dest(paths.dist));
});

gulp.task('connect', function() {
  connect.server({
    root: paths.dist
  });
});

gulp.task('move', function () {
  gulp.src([paths.src + 'index.html'])
  .pipe(gulp.dest(paths.dist));
});
 
gulp.task('watch', function () {
  gulp.watch([paths.src + '*.html'], ['move']);
  gulp.watch([paths.css + '*.styl'], ['stylus']);
});

gulp.task('default', ['move', 'stylus', 'js', 'connect', 'watch']);
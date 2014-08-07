var
  browserify = require('browserify'),
  watchify = require('watchify'),
  gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify  = require('gulp-uglify'),
  source = require('vinyl-source-stream'),
  buffer = require('vinyl-buffer'),
  sourceFile = './assets/js/app/app.js',
  destFolder = './assets/js/build',
  destFile = 'bundle.js',
  testsSourceFile = './test/src/testSrc.js',
  testDestFolder = './test/src/';

gulp.task('buildLibs', function() {
  gulp.src(['./assets/js/vendors/*.js'])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(destFolder));
});

gulp.task('buildApp', function(){
  console.log("BuildApp");
  return browserify({
    entries: [sourceFile]
  })
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source(destFile))
    // Start piping stream to tasks!
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(destFolder));
});

gulp.task('watchApp', function() {
  var bundler = watchify('./assets/js/app/app');
  bundler.on('update', rebundle);

  function rebundle(ids) {
    return bundler.bundle()
      .pipe(source(destFile))
      .pipe(gulp.dest(destFolder));
    console.log("Rebundled", bundler);
  }
  return rebundle();
});

gulp.task('watchApp', function() {
  gulp.watch('./assets/js/app/*.js', ['buildApp', 'buildTests']);
  gulp.watch('./assets/js/app/*/*.js', ['buildApp', 'buildTests']);
});

gulp.task('buildTests', function(){
  console.log("Build Tests");
  return browserify({
    entries: [testsSourceFile]
  })
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source(destFile))
    // Start piping stream to tasks!
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest(testDestFolder));
});

gulp.task('default', ['buildLibs','buildApp', 'watchApp', 'buildTests']);

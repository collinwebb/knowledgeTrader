/* File: gulpfile.js */

//package requirements
var gulp =        require('gulp'),
    gutil =       require('gulp-util'),

    jshint =      require('gulp-jshint'),
    sass =        require('gulp-sass'),
    plumber =     require('gulp-plumber'),
    sourcemaps =  require('gulp-sourcemaps'),
    concat =      require('gulp-concat'),
    copy =        require('gulp-copy'),
    jade =        require('gulp-jade'),
    bower =       require('gulp-bower'),
    watch =       require('gulp-watch'),
    coffee =      require('gulp-coffee'),
    browser =     require('browser-sync'),
    run =         require('run-sequence'),
    del =         require('del'),
    isProd =      gutil.env.type === 'prod',

    paths = {
      filesrc: ['./source/**/*.*'],
      jadesrc: ['./source/**/*.jade'],
      htmlsrc: ['./public/**/*.html'],
      sasssrc: ['./source/**/*.scss'],
      codesrc: ['./source/**/*.js'],
      mediasrc: ['./source/media/**/*', './source/favicon.ico'],
      destination: './public',
      coffeesrc: './source/**/*.coffee',
      temp: './temp',
      tempfiles: ['./temp/*.css', './temp/*.js']
    };


//build tasks
gulp.task('default', function(cb){
  run('build', 'serve', 'watch', cb);
});
gulp.task('build', ['clean:public', 'clean:temp'], function(cb){
  run('bower', 'jade', 'build-js', 'build-css', 'copy', cb);
});
//refresh tasks
gulp.task('refresh', function(cb){
  return run('build', 'reload', cb);
});
gulp.task('serve', function(){
  browser.init({server: paths.destination});
});
gulp.task('reload', function(){
  browser.reload();
});
//wipe out public and temp folders on build
gulp.task('clean:public', function(cb){
  del([
    paths.destination
  ], cb);
});
gulp.task('clean:temp', function(cb){
  del([
    paths.temp
  ], cb);
});


//set which files to watch for changes
gulp.task('watch', function(){
  return watch(paths.filesrc, function(){
    gulp.start('refresh');
  });
});

//helper tasks
gulp.task('copy', function(){
  return gulp.src(paths.mediasrc)
  .pipe(copy(paths.destination, {prefix: 1}))
  .on('error', gutil.log);
});
gulp.task('bower', function(){
  return bower();
});
gulp.task('jshint', function(){
  return gulp.src(paths.codesrc)
  .pipe(jshint())
  .pipe(jshint.reporter('jshint-stylish'));
});
gulp.task('jade', function(){
  return gulp.src(paths.jadesrc)
  .pipe(plumber())
  .pipe(jade({pretty: true, doctype: 'html', locals: {isProd: isProd}}))
  .pipe(gulp.dest(paths.destination))
  .on('error', gutil.log);
});
gulp.task('build-css', function(){
  return gulp.src(paths.sasssrc)
  .pipe(plumber(function(error) {
    gutil.log(gutil.colors.red(error.message));
    this.emit('end');
  }))
  .pipe(sourcemaps.init())
  .pipe(sass({errLogToConsole: true}))
  .pipe(concat('styles.css'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.destination));
});
gulp.task('build-js', function(){
  return gulp.src(paths.codesrc)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(concat('index.js'))
    //uglify if you run 'gulp --type prod'
  .pipe(isProd ? uglify() : gutil.noop())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(paths.destination));
});

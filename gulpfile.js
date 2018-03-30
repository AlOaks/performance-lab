var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    plumber = require('gulp-plumber'),
    notify = require('gulp-notify'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    rename = require("gulp-rename"),
    eslint = require("gulp-eslint"),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync');

var plumberErrorHandler = {
   errorHandler: notify.onError({
      title: 'Gulp',
      message: 'Error: <%= error.message %>'
   })
};

gulp.task("scripts", ["lint"], function() {
    return gulp
      .src("js/*.js") // What files do we want gulp to consume?
      .pipe(uglify()) // Call the uglify function on these files
      .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
      .pipe(gulp.dest("./build/js")); // Where do we put the result?
  });

gulp.task('sass', function() {
   gulp.src('./sass/style.scss')
      .pipe(plumber(plumberErrorHandler))
      .pipe(sass())
      .pipe(autoprefixer({
         browsers: ['last 2 versions']
      }))
      .pipe(rename('style.min.css'))
      .pipe(gulp.dest('./build/css'))
});

gulp.task('lint', function(){

});


gulp.task('browser-sync', function() {
   browserSync.init({
      server: {
         baseDir: "./"
      }
   });

   gulp.watch(['build/css/*.css', 'build/js/*.js']).on('change', browserSync.reload);
});

gulp.task('watch', function() {
   gulp.watch('sass/*.scss', ['sass']);
   gulp.watch('js/*.js', ['scripts']);
});

gulp.task('default', ['watch', 'browser-sync', 'scripts', 'sass']);



var gulp  = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss      = require('gulp-postcss'),
  browserSync = require('browser-sync').create(),
  autoprefixer = require('autoprefixer');

function buildCss() {
    return gulp.src(['scss/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer() ]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('css/'))
        .pipe(cleanCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('css/'))
}

function watcher() {
    browserSync.init({
      server: {
          baseDir: "./"
        }
    });
    gulp.watch(['scss/*.scss'], gulp.series(buildCss));
    gulp.watch("./css/*.css").on('change', browserSync.reload);
}

exports.watch = gulp.series(buildCss, watcher);
exports.default = gulp.series(buildCss);

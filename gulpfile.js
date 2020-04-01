var gulp  = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss      = require('gulp-postcss'),
  autoprefixer = require('autoprefixer');

  const { readdirSync, statSync } = require('fs')
  const { join } = require('path')

function buildCss(path) {
  console.log('== Compiling SCSS in', path);

    return gulp.src([path +'/scss/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer({ browsers: [
                'Chrome >= 35',
                'Firefox >= 38',
                'Edge >= 12',
                'Explorer >= 10',
                'iOS >= 8',
                'Safari >= 8',
                'Android 2.3',
                'Android >= 4',
                'Opera >= 12']})]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path + '/css/'))
        .pipe(cleanCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(path + '/css/'))
}

function watcher() {
	const getDirs = p => readdirSync(p).filter(f => statSync(join(p, f)).isDirectory());
  // Find themes in the themes dir
	var themes = getDirs("themes");
  // Add watcher for each theme
	themes.forEach(theme => {
    gulp.watch(['themes/'+ theme +'/scss/*.scss'], gulp.series(function() { return buildCss('themes/'+ theme);}) );
	});
}

exports.watch = gulp.series(buildCss, watcher);
exports.default = gulp.series(buildCss);

gulp.task('watch', watcher);

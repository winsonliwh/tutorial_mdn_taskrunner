const autoprefixer = require('gulp-autoprefixer');
const csslint = require('gulp-csslint');
const htmltidy = require('gulp-htmltidy');
const gulp = require('gulp');
const { series } = require('gulp');
const babel = require('gulp-babel');
const jshint = require('gulp-jshint');

/*
function(cb) {
  console.log('Gulp running');
  cb();
};
*/
function html(cb) {
  return gulp.src('src/index.html')
        .pipe(htmltidy())
        .pipe(gulp.dest('build'));
    cb();
}

function css(cb) {
    return gulp.src('src/style.css')
        .pipe(csslint())
        .pipe(csslint.formatter('compact'))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(gulp.dest('build'));
    cb();
}

function js(cb) {
    return gulp.src('src/main.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(gulp.dest('build'));
        cb();
}

function watch() {
  gulp.watch('src/*.html', html)
  gulp.watch('src/*.css', css)
  gulp.watch('src/*.js', js)
}

exports.watch = watch;
exports.html = html;
exports.css = css;
exports.js = js;
exports.default = series(html, css, js, watch);


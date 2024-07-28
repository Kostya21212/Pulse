const gulp = require('gulp');
const browserSync = require('browser-sync').create(); // Используйте create() для создания нового экземпляра
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
gulp.task('server', function() {
    browserSync.init({
        server: {
            baseDir: "."
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("sass/*.scss") // Исправленный путь для исходных файлов SCSS/SASS
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("/src/css")) // Исправленный путь для скомпилированных CSS файлов
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("sass/*.scss", gulp.parallel('styles')); // Исправленный путь для отслеживания изменений
});

gulp.task('default', gulp.parallel('watch', 'server', 'styles'));

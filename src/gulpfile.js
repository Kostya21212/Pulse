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

// gulp.task('html', function() {
//     return gulp.src("*.html")
//         .pipe(htmlmin({ collapseWhitespace: true }))
//         .pipe(gulp.dest("dist/"));
// });

// gulp.task('scripts', function() {
//     return gulp.src("*.js")
//         .pipe(gulp.dest("dist/js.js"))
//         .pipe(browserSync.stream());
// });

// gulp.task('fonts', function() {
//     return gulp.src("fonts/**/*")
//         .pipe(gulp.dest("dist/fonts"));
// });

// gulp.task('icons', function() {
//     return gulp.src("icons/*")
//         .pipe(gulp.dest("dist/icons"));
// });

// gulp.task('mailer', function() {
//     return gulp.src("mailer/*")
//         .pipe(gulp.dest("dist/mailer"));
// });

// gulp.task('images', async function() {
//     const imagemin = await loadImagemin();
//     return gulp.src("image/*")
//         .pipe(imagemin())
//         .pipe(gulp.dest("dist/img"));
// });

// gulp.task('default', gulp.parallel('watch', 'server', 'styles'));
// , 'scripts', 'fonts', 'icons', 'mailer', 'html', 'images'
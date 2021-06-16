// Initialize modules
let gulp = require('gulp');
// Importing packages
let sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    csscomb = require('gulp-csscomb'),
    cssmin = require('gulp-clean-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    babel = require('gulp-babel'),
    gcmq = require('gulp-group-css-media-queries'),
    smrtgrid = require('smart-grid'),
    autoprfxr = require('gulp-autoprefixer'),
    del = require('del');
bs = require('browser-sync').create();

let path = {
    src: {
        sass: 'src/sass/style.sass',
        js: 'src/js/**/*.*',
        img: 'src/img/**/*.*',
        vendor: {
            smartgrid: 'src/vendor/smart-grid'
        }
    },
    app: {
        css: 'dist/css/',
        js: 'dist/js/',
        img: 'dist/img/'
    }
};

//CSS
function styles() {
    return gulp.src(path.src.sass)
        .pipe(sass({
            outputStyle: 'expanded',
            'include css': true
        })).on('error', sass.logError)
        .pipe(autoprfxr({ cascade: false }))
        .pipe(gcmq())
        .pipe(csscomb())
        .pipe(cssmin())
        .pipe(gulp.dest(path.app.css))
        .pipe(bs.stream());
}

//JS
function scripts() {
    return gulp.src(path.src.js)
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(concat('app.js'))
        .pipe(uglify({
            toplevel: true
        }))
        .pipe(gulp.dest(path.app.js))
        .pipe(bs.stream());
}

//img
function imgs() {
    return gulp.src(path.src.img)

        .pipe(gulp.dest(path.app.img))
        .pipe(bs.stream());
}

//libs
function libs() {
    return gulp.src([
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/counterup/jquery.counterup.js',
            'node_modules/waypoints/lib/jquery.waypoints.js',

        ])
        // .pipe(babel({
        //     presets: ['@babel/env']
        // }))
        .pipe(concat('libs.js'))
        .pipe(uglify())
        .pipe(gulp.dest(path.app.js))
}

//del
function clean() {
    return del(['dist/*'])
}

//smartgrid
function smartgrid() {
    let settings = {
        outputStyle: 'sass',
        columns: 12,
        offset: '30px',
        mobileFirst: false,
        container: {
            maxWidth: '1200px',
            fields: '15px'
        },
        breakPoints: {
            lg: {
                width: '1200px',
                /* -> @media (max-width: 1100px) */
            },
            md: {
                width: '960px'
            },
            sm: {
                width: '780px',
                fields: '15px' /* set fields only if you want to change container.fields */
            },
            xs: {
                width: '560px'
            },
            // xxs: {
            //     width: '320px'
            // }
        }
    };
    return smrtgrid(path.src.vendor.smartgrid, settings)({});
}

//watch
function watch() {
    bs.init({
        server: "./",
        notify: false,
        open: true,
        ui: false
    });

    gulp.watch('src/**/**/*.+(sass|scss)', styles);
    gulp.watch('src/js/**/*.js', scripts);
    gulp.watch('src/img/**/*.*', imgs);
    gulp.watch('./**/*.html').on('change', bs.reload);
}

//tasks
gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('imgs', imgs);
gulp.task('libs', libs);
gulp.task('smartgrid', smartgrid);
gulp.task('del', clean);
gulp.task('watch', watch);
gulp.task('build', gulp.series(clean, gulp.parallel(styles, scripts, libs, imgs)));
gulp.task('dev', gulp.series('build', 'watch'));
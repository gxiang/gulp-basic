// Basic Gulp File
//
const gulp = require('gulp'),    
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    autoprefix = require('gulp-autoprefixer'),    
    bower = require('gulp-bower'),
    include = require('gulp-include')
    ;

const projectSrc = "./src";
const projectDest = "./dist";

var config = {
    bowerDir: './bower_components',
    htmlDir : projectSrc ,
    fontDir: {
        src: projectSrc + '/fonts'
        , dest : projectDest + '/fonts'
    },
    sassDir: {
        src: projectSrc + '/sass'
        , dest : projectDest + '/css'
    },
    jsDir: {
        src: projectSrc + '/js'
        , dest : projectDest + '/js'
    },
    includeDir : {
        src: projectSrc
        , dest: projectDest
    },
    imgDir : {
        src: projectSrc + '/images'
        , dest : projectDest + '/images'        
    }
}

gulp.task('copy:icons', function() {
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*')
        .pipe(gulp.dest(config.fontDir.dest));
});

gulp.task('copy:fonts', function() {
    return gulp.src(config.fontDir.src + '/**/*')
        .pipe(gulp.dest(config.fontDir.dest));
});

gulp.task('copy:images', function() {
    return gulp.src(config.imgDir.src + '/**/*')
        .pipe(gulp.dest( config.imgDir.dest ));
});

gulp.task('include', function() {
    gulp.src([config.includeDir.src + '/**/*.{html,js}'])
        .pipe(include())
            .on('error', console.log)
        .pipe(gulp.dest(config.includeDir.dest));
});

gulp.task('css', function() {
    return gulp.src(config.sassDir.src + '/**/*.scss')    
        // Run Sass on those files
        .pipe(sass().on("error",  sass.logError))     
        // Write the resulting CSS in the output folder
        .pipe(autoprefix('last 2 version'))
        .pipe(gulp.dest(config.sassDir.dest));      
});

gulp.task('script', function() {
  gulp.src( config.jsDir.src + '/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest( config.jsDir.dest ))
});

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir))
});

gulp.task('build', [    
    'css'
    , 'script'
    , 'copy:icons'    
    , 'copy:fonts'    
    , 'copy:images'    
]);

gulp.task('default', ['bower', 'watch']);

gulp.task('watch', ['build'], function() {
    gulp.watch(config.sassDir.src + '/**/*.scss', ['css']);
    gulp.watch(config.jsDir.src + '/**/*.js', ['script']);
    // gulp.watch(config.imgDir.src + '/**/*', ['images']);
    // gulp.watch(config.includeDir.src + '/**/*.{html,js}', ['include','images']);
});


/**
 * General info:
 * 
 * Atom docs
 * https://github.com/atom/atom-shell/tree/master/docs
 * 
 * General Gulp intro
 * http://www.benfarrell.com/2014/07/05/a-polymer-gulp-atom-shell-workflow/
 * https://speakerdeck.com/bermonpainter/front-end-workflows-with-gulp
 * 
 * Gulp/Node/Stylus examples
 * https://www.npmjs.com/package/gulp-stylus
 * http://www.simiansblog.com/simian-s-blog/flirting-with-gulp-part-ii
 * 
 */

var gulp = require('gulp'),
    shell = require('gulp-shell'),
    downloadatomshell = require('gulp-download-atom-shell'),
    stylus = require('gulp-stylus'),
    axis = require('axis')
;

/**
 * Downloads Atom Shell to run the app on desktop
 */
gulp.task( 'downloadatomshell', function( cb ) {
    downloadatomshell({
        version: '0.21.0',
        outputDir: 'binaries'
    }, cb );
});

/**
 * Runs the main application.
 * 
 * @todo This could be renamed 'default' once stable.
 */
gulp.task( 'default', shell.task([
    'binaries\\atom src\\app.js'
]));

/**
 * Runs all Stylus files and outputs CSS.
 */
gulp.task( 'stylus', function stylysInit() {
    gulp.src( 'src/client/stylus/main.styl' )
        .pipe(
            stylus({
                use: axis(),
                compress: false
            })
        )
        .pipe( gulp.dest( 'src/client/css/') );
});
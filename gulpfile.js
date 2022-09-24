const { src, dest, watch, parallel } = require('gulp')
const browserSync = require('browser-sync').create()


function browsersync() {
    browserSync.init({
      server : {
        baseDir: 'src/'
      }
    });
}  

function build() {
    return src([
      'src/script.js',
      'src/*.html',
      'src/css/*.css'
    ], {base: 'src'})
      .pipe(dest('dist'))
  }

function watching () {
    watch(['src/*.html']).on('change', browserSync.reload)
    watch(['src/*.js']).on('change', browserSync.reload)
    watch(['src/css/*.css']).on('change', browserSync.reload)
}

exports.watching = watching
exports.browsersync = browsersync

exports.build = build
exports.default = parallel(browsersync, watching)

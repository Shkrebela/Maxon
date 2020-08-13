let projectFolder = "dist";
let sourceFolder = "src";

let fs = require('fs');

let path = {
    build: {
        html: projectFolder + "/",
        css: projectFolder + "/css",
        js: projectFolder + "/js",
        img: projectFolder + "/img",
        media: projectFolder + "/media",
        fonts: projectFolder + "/fonts",
    },
    src: {
        html: [sourceFolder + "/*.html", "!" + sourceFolder + "/_*.html"],
        css: sourceFolder + "/scss/main.scss",
        js: sourceFolder + "/js/main.js",
        img: [sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}", "!" + sourceFolder + "/img/svg/*.svg"],
        media: sourceFolder + "/media/**/*.{mp4,webm,mp3}",
        svg: sourceFolder + "/img/svg/*.svg",
        fonts: sourceFolder + "/fonts/*.{ttf,woff}",
    },
    watch: {
        html: sourceFolder + "/**/*.html",
        css: sourceFolder + "/scss/**/*.scss",
        js: sourceFolder + "/js/**/*.js",
        img: sourceFolder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + projectFolder + "/"
}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require("browser-sync").create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    gcmq = require('gulp-group-css-media-queries'),
    cleanCSS = require('gulp-clean-css'),
    rename = require("gulp-rename"),
    uglify = require('gulp-uglify-es').default,
    svgSprite = require('gulp-svg-sprite'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2');

function browserSync(param) {
    browsersync.init({
        server: {
            baseDir: "./" + projectFolder + "/"
        },
        port: 3000,
        notify: false
    })
}

function html() {
    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(
            gcmq()
        )
        .pipe(
            autoprefixer({
                cascade: true,
                overrideBrowserslist: ["last 5 versions"]
            })
        )
        .pipe(dest(path.build.css))
        .pipe(cleanCSS())
        .pipe(rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(uglify())
        .pipe(rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function img() {
     src([path.src.svg])
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../sprite.svg",
                },
                symbol : true
            }

        }))
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
    return src(path.src.img)
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function media() {
    return src(path.src.media)
        .pipe(dest(path.build.media))
        .pipe(browsersync.stream())
}

function fonts() {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts))
        .pipe(browsersync.stream())
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts))
        .pipe(browsersync.stream())
}

function fontsStyle(params) {
    let file_content = fs.readFileSync(sourceFolder + '/scss/base/_fonts.scss');
    if (file_content == '') {
        fs.writeFile(sourceFolder + '/scss/base/_fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(sourceFolder + '/scss/base/_fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}

function cb() {}

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], img);
    gulp.watch([path.watch.img], fonts);
}

function clean(params) {
    return del(path.clean)
}

let build = gulp.series(clean, gulp.parallel( js, css, html, img, fonts, media), fontsStyle);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.media = media;
exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.img = img;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;

const { src, dest, watch, series } = require("gulp");
const webpackConfig = require("./webpack.config");
const webpack = require("webpack-stream");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const browserSync = require("browser-sync");
const eslint = require('gulp-eslint');
const sass = require("gulp-sass")(require("sass"));
const sassGlob = require("gulp-sass-glob");
const autoprefixer = require("gulp-autoprefixer");
const cleanCss = require("gulp-clean-css");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");

// sassコンパイル
const sassComp = (done) => {
  src("./src/scss/**/*.scss")
    .pipe(plumber(notify.onError("Error: <%= error.message %>")))
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest("./dist/css"));
  done();
};

// css圧縮
const minifyCss = (done) => {
  src("./dist/**/*.css")
    .pipe(cleanCss())
    .pipe(rename({
      extname: ".min.css"
    }))
    .pipe(dest("./public/"));
  done();
};

// jsBuild
const jsBuild = (done) => {
  src("./src/js/app.js")
    .pipe(
      // gulp-plumber
      // Stream中に起こるのエラーが原因でタスクが強制停止することを防止するモジュール
      // watch中にエラーが発生するとwatch自体が停止してしまうため、これを防止するために使われている
      plumber({
        // gulp-notify
        // デスクトップ通知が行えるモジュール
        // コマンドラインではエラーに気づきにくいためエラーが発生したときにデスクトップに通知するといった使い方がある
        errorHandler: notify.onError("Error: <%= error.message %>"),
      })
    )
    .pipe(webpack(webpackConfig))
    .pipe(dest("./dist/js/"));
  done();
};

// js圧縮
const minifyJs = (done) => {
  src("./dist/**/*.js")
    .pipe(uglify())
    .pipe(rename({
      extname: ".min.js"
    }))
    .pipe(dest("./public/"));
  done();
};

// eslint
const lint = (done) => {
  src(['./src/**/*.js'])
    .pipe(plumber({
      errorHandler: function (error) {
        const taskName = 'eslint';
        const title = '[task]' + taskName + ' ' + error.plugin;
        const errorMsg = 'error: ' + error.message;
        // ターミナルにエラーを出力
        console.error(title + '\n' + errorMsg);
        // エラーを通知
        notify.onError({
          title: title,
          message: errorMsg,
          time: 3000
        });
      }
    }))
    .pipe(eslint({ useEslintrc: true })) // .eslintrcを参照
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .pipe(plumber.stop());
  done();
}

// browser-sync
// ファイルの変更を監視して、変更を即座にブラウザーに反映させることができる
const BS = (done) => {
  browserSync.init({
    server: {
      baseDir: "./",
      index: "index.html",
    },
  });
  done();
};
const bsReload = (done) => {
  browserSync.reload();
  done();
};

// タスク化
exports.sassComp = sassComp;
exports.minifyCss = minifyCss;
exports.jsBuild = jsBuild;
exports.minifyJs = minifyJs;
exports.lint = lint;
exports.BS = BS;
exports.bsReload = bsReload;

// watch
const watchFiles = (done) => {
  watch("./src/**/*.scss", sassComp);
  watch("./dist/**/*.css", minifyCss);
  watch("./src/**/*.js", jsBuild);
  watch("./dist/**/*.js", minifyJs);
  watch("./src/**/*.js", lint);
  watch("./*.html", bsReload);
  watch("./public/**/*.+(js|css)", bsReload);
  done();
};

exports.default = series(watchFiles, sassComp, minifyCss, BS);
// exports.default = series(watchFiles, sassComp, minifyCss, lint, jsBuild, minifyJs, BS);
// exports.default = series(watchFiles, minifyCss, jsBuild, minifyJs, lint, BS);
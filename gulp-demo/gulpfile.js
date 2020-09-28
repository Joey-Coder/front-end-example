// 引入gupl模块
const gulp = require("gulp");

// 建立gulp任务
// first是任务名称
gulp.task("first", () => {
  console.log("my first gulp task");
  // gulp.src获取要处理的文件
  // .pipe代表处理过程
  // gulp.dest输出文件
  gulp.src("./src/css/base.css").pipe(gulp.dest("dist/css"));
});

// 执行整个文件的方法gulp first

// --------------------------------html压缩-----------------------------------

//1. html代码压缩任务
//2. 抽取html中的公共代码

const htmlmin = require("gulp-htmlmin"); // 压缩html模块
const fileinclude = require("gulp-file-include"); // 抽离html模块

gulp.task("htmlmin", () => {
  console.log("start html minify...");
  gulp
    .src("./src/*.html")
    .pipe(fileinclude()) //标注共同部分代码
    .pipe(htmlmin({ collapseWhitespace: true })) // collapsewhitespace是否压缩空格
    .pipe(gulp.dest("./dist"));
});

// ---------------------------less转css然后压缩-----------------------------

// 1. less转css

// 2. 压缩css

const less = require("gulp-less");
const csso = require("gulp-csso");

gulp.task("cssmin", () => {
  // less 转 css
  gulp
    .src(["./src/css/*.less", "./src/css/*.css"])
    .pipe(less())
    .pipe(csso())
    .pipe(gulp.dest("dist/css"));
});

// ----------------------------------js转换与压缩----------------------------------------------

// 1. es6代码转es5

// 2. 代码压缩

const babel = require("gulp-babel"); // es6 -> es5

const uglify = require("gulp-uglify"); // mini jsfile

gulp.task("jsmin", () => {
  gulp
    .src("./src/js/*.js")
    .pipe(
      babel({
        // 判断代码的运行环境， 将代码转换为当前环境所支持的代码
        presets: ["@babel/env"],
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("dist/js"));
});

// ----------------------------拷贝文件---------------------------------

gulp.task("copy", () => {
  gulp.src("./src/images/*").pipe(gulp.dest("dist/images"));

  gulp.src("./src/lib/*").pipe(gulp.dest("dist/lib"));
});

// -------------------------------------------------------------------


//  并行执行所有任务
gulp.task("default", gulp.parallel("htmlmin", "cssmin", "jsmin", "copy"));

var root = require("gulp-styledocco");
var gulp = require("gulp");
var options = {
  opt: 'docs',
  name: "123\"& touch aaa & \""
}

gulp.src("./gulp-styledocco.js")
  .pipe(root(options));
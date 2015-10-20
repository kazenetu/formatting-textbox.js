var gulp = require('gulp');
var jsdoc = require("gulp-jsdoc");

// jsdocを書き出すタスク
gulp.task("jsdoc", function() {
  gulp.src(["js/formatting-textbox.js"])
		.pipe(jsdoc("./doc/"));
});

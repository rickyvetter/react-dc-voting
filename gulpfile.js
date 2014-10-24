var gulp = require('gulp');
var react = require('gulp-react');
var del = require('del');
var rename = require("gulp-rename");
var browserify = require("gulp-browserify");
var plumber = require("gulp-plumber");

var paths = {
  js: {
    src: "src/js/**/*",
    srcMain: "src/js/app.js",
    targetDir: "public/js"
  },
  jsx: {
    src: "src/jsx/**/*.jsx",
    targetDir: 'src/compiled-jsx'
  }
};

function deleteCompiledJSX(cb) {
  var compiledFiles = paths.jsx.targetDir + "/**/*";
  del([compiledFiles], cb);
};

// Clean-up final compiled development assets
gulp.task('clean', ['remove-compiled-jsx'],function(cb) {
  del([
    'public/js/app.js',
    'public/css/app.css'
  ], cb);
});

// Remove compiled JSX (dev)
gulp.task('remove-compiled-jsx-dev', ['browserify'], function(cb) {
  deleteCompiledJSX(cb);
});

// Compile JSX to JS
gulp.task('compile-jsx', function() {
  return gulp.src(paths.jsx.src)
    .pipe(plumber())
    .pipe(react())
    .pipe(gulp.dest(paths.jsx.targetDir));
});

// Take the source JS and run browserify
gulp.task('browserify', ['compile-jsx'], function() {
  return gulp.src(paths.js.srcMain)
    .pipe(plumber())
    .pipe(browserify())
    .pipe(gulp.dest(paths.js.targetDir));
});

// Remove compiled JSX (prod)
gulp.task('remove-compiled-jsx', function(cb) {
  deleteCompiledJSX(cb);
});

gulp.task('build', ['compile-jsx'], function() {
    /*
      - Step 1: Run the code through Browserify
      - Step 3: Append the property ID to the final file
    */

    return gulp.src(paths.js.srcMain)
      .pipe(plumber())
      .pipe(browserify())
      .pipe(gulp.dest(paths.js.targetDir))
});

// Rerun the task when a file changes
gulp.task('watch', ['build'], function() {
  gulp.watch([paths.jsx.src, paths.js.src], ['build']);
});

/* CLI default task (run when you execute `gulp` only) */
gulp.task('default', ['watch']);
import gulp from "gulp";
import cleanCSS from "gulp-clean-css";
import gulpSass from "gulp-sass";
import dartSass from "sass";
import imagemin from "gulp-imagemin";
import uglify from "gulp-uglify";
import concat from "gulp-concat";
const sass = gulpSass(dartSass);

// ######## Paths ##################

const paths = {
  styles: {
    src: ["src/assets/scss/main.scss"],
    dest: "dist/assets/css",
  },
  scripts: {
    src: [
      "node_modules/jquery/dist/jquery.min.js",
      "./node_modules/bootstrap/dist/js/bootstrap.min.js",
      "./node_modules/@fortawesome/fontawesome-free/js/all.min.js",
      "./src/assets/js/bundle.js",
    ],
    dest: "dist/assets/js",
  },
  others: {
    src: [
      "src/*.html",
      "!src/assets",
      "!src/assets/{images,js,scss}",
      "!src/assets/{images,js,scss}/**/*",
    ],
    dest: "dist/",
  },
};

// ######## Styles ##################
export const styles = () => {
  return gulp
    .src(paths.styles.src)
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(gulp.dest(paths.styles.dest));
};

// ######## Script Files ##################

export const scripts = () => {
  return gulp
    .src(paths.scripts.src)
    .pipe(concat("main.min.js"))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest));
};

// ######## Copy Files ##################
export const copyFiles = () => {
  return gulp.src(paths.others.src).pipe(gulp.dest(paths.others.dest));
};

// ######## Watch Files ##################

export const watchFiles = () => {
  gulp.watch("src/assets/js/bundle.js", scripts);
  gulp.watch(paths.others.src, copyFiles);
  gulp.watch("./src/assets/scss/**/*.scss", styles);
};

// ######## Parellel ##################
export const dev = gulp.series(
  gulp.parallel([copyFiles, styles, scripts]),
  watchFiles
);

export default dev;

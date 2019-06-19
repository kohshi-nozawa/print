const gulp = require('gulp');

const gs = require('gulp-sass');

//ベンダープレフィックスを自動化
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
//npm i -D gulp gulp-postcss autoprefixer

//Chromeの開発者ツールでsassの場所がわかるようにマッピング
const sourcemaps = require("gulp-sourcemaps");
//npm install --save-dev gulp-sourcemaps

//引数を使えるように
const minimist = require('minimist'); 
//npm install minimist --save-dev 
// 引数を格納するための変数の記述
const options = minimist(process.argv.slice(2), {
	string: 'env',
	default: {
		env: '' // 引数の初期値
	}
});
const dn = options.env;

gulp.task('default', () => {
  return gulp.watch('sass/**/**.scss', () => {
    return gulp.src('sass/style.scss')
      .pipe(sourcemaps.init())
      .pipe(gs({
        outputStyle: 'expanded',
      }).on('error', gs.logError))
      .pipe(sourcemaps.write("./maps/"))
      .pipe(gulp.dest('css'));
  });
});

gulp.task("sass", function () {
  return (
    gulp
      .src(dn + 'sass/style.scss')
      .pipe(sourcemaps.init())
      .pipe(gs({
        outputStyle: 'expanded',
      }).on('error', gs.logError))
      .pipe(sourcemaps.write(dn + '/maps/'))
      .pipe(gulp.dest(dn + 'css'))
  );
}); //npx gulp sass --env <worktree dir name>/
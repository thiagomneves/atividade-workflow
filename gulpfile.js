var del = require('del');
var gulp = require('gulp');
var htmlclean = require('gulp-htmlclean');
var sass = require('gulp-sass');
var concat = require('gulp-concat');

gulp.task('clean-css', function(){
	del('./dist/css');
});

gulp.task('clean-index', function(){
	del('./dist/index.html');
});

gulp.task('sass',['clean-css'], function(){
	return gulp.src('./source/scss/*.scss')
			.pipe(concat('style.css'))
			.pipe(sass().on('error', sass.logError))
			.pipe(gulp.dest('./dist/css/'))
});

gulp.task('min-index',['clean-index'],function(){
	return gulp.src('./source/index.html')
	.pipe(htmlclean({
		protect: /<\!--%fooTemplate\b.*?%-->/g,
		edit: function(html) {
			return html.replace(/\begg(s?)\b/ig, 'omelet$1');}
		}))
	.pipe(gulp.dest('./dist/'));
});

gulp.task('background', function(){
	gulp.watch('./source/scss/base.scss', ['sass']);
	gulp.watch('./source/scss/layout.scss', ['sass']);
	gulp.watch('./source/scss/style.scss', ['sass']);
	gulp.watch('./source/index.html', ['min-index']);
})
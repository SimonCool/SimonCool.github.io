var gulp = require('gulp'),
    less = require('gulp-less'),
     //当发生异常时提示错误 确保本地安装gulp-notify和gulp-plumber
     notify = require('gulp-notify'),
    plumber = require('gulp-plumber');
gulp.task('default', function () {

});
gulp.task('testLess', function () {
    //编译src目录下的所有less文件(,'!less/**/{reset,test}.less'可以剔除不需要的)
    gulp.src('less/*.less')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        .pipe(gulp.dest('css'));
});
gulp.task('testWatch', function () {
    gulp.watch('less/*.less', ['testLess']); //当所有less文件发生改变时，调用testLess任务
});
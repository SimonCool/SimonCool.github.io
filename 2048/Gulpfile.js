var gulp = require('gulp'),
    less = require('gulp-less'),
     //�������쳣ʱ��ʾ���� ȷ�����ذ�װgulp-notify��gulp-plumber
     notify = require('gulp-notify'),
    plumber = require('gulp-plumber');
gulp.task('default', function () {

});
gulp.task('testLess', function () {
    //����srcĿ¼�µ�����less�ļ�(,'!less/**/{reset,test}.less'�����޳�����Ҫ��)
    gulp.src('less/*.less')
        .pipe(plumber({errorHandler: notify.onError('Error: <%= error.message %>')}))
        .pipe(less())
        .pipe(gulp.dest('css'));
});
gulp.task('testWatch', function () {
    gulp.watch('less/*.less', ['testLess']); //������less�ļ������ı�ʱ������testLess����
});
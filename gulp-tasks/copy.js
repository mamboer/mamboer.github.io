module.exports = function(){

	var gulp = this.gulp,
		dirs = this.opts.dirs,
		cfg = this.opts.cfg,
		$ = this.opts.$;

    gulp.src([
        dirs.public + '/css/bootstrap.css',
        dirs.public + '/css/font-awesome.css'
      ],
      {base: dirs.public}
    ).pipe(gulp.dest(dirs.assetsDir));

     return gulp.src([dirs.fonts + '/**/*', dirs.imgs + '/**/*'], {base: dirs.public})
        .pipe(gulp.dest(dirs.assetsDir));

};
module.exports.dependencies = ['imgmin'];

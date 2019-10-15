module.exports = function (gulp, plugins, path, isProduction) {
	return function (done) {
		gulp.src(path.src.imgBitmap)
			.pipe(plugins.if(isProduction, plugins.tinypngCompress({
				key: 'kEx97Kwcl6gt8PXj1VnvLimN9IXXoppF',
				log: true,
				summarise: true,
				parallelMax: 999,
			})).on("error", plugins.notify.onError({
				title: "TinyPNG error",
			})))
			.pipe(gulp.dest(path.dist.img));

		done();
	};
};
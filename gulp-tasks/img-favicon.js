const FAVICON_DATA_FILE = 'favicon-data.json';

module.exports = function(gulp, plugins, path, isProduction) {
	return function(done) {
		plugins.realFavicon.generateFavicon({
			masterPicture: path.src.favicon,
			dest: path.dist.favicon,
			iconsPath: '/img/favicon/',
			design: {
				ios: {
					pictureAspect: 'noChange',
					assets: {
						ios6AndPriorIcons: false,
						ios7AndLaterIcons: false,
						precomposedIcons: false,
						declareOnlyDefaultIcon: true
					}
				},
				desktopBrowser: { design: 'raw' },
				windows: {
					pictureAspect: 'noChange',
					backgroundColor: '#000000',
					onConflict: 'override',
					assets: {
						windows80Ie10Tile: false,
						windows10Ie11EdgeTiles: {
							small: false,
							medium: true,
							big: false,
							rectangle: false
						}
					}
				},
				androidChrome: {
					pictureAspect: 'noChange',
					themeColor: '#000000',
					manifest: {
						display: 'standalone',
						orientation: 'notSet',
						onConflict: 'override',
						declared: true
					},
					assets: {
						legacyIcon: false,
						lowResolutionIcons: false
					}
				},
				safariPinnedTab: {
					pictureAspect: 'blackAndWhite',
					threshold: 53.90625,
					themeColor: '#000000'
				}
			},
			settings: {
				scalingAlgorithm: 'Mitchell',
				errorOnImageTooSmall: false,
				readmeFile: false,
				htmlCodeFile: false,
				usePathAsIs: false
			},
			markupFile: FAVICON_DATA_FILE
		});

		done();
	};
};

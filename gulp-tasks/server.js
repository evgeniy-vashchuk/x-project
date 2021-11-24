module.exports = function (gulp, plugins, path, isProduction) {
	return function (done) {
		plugins.browserSync({
			server: {
				baseDir: path.server,
				directory: true
			},
			notify: {
				styles: {
					padding: '5px 5px 5px 8px',
					position: 'fixed',
					fontSize: '12px',
					zIndex: '9999',
					borderRadius: '0px 0px 0px 5px',
					color: 'white',
					textAlign: 'center',
					display: 'block',
					backgroundColor: '#26263F'
				}
			},
			//online: false, // Work offline without internet connection
			//tunnel: 'yousutename', // Attempt to use the URL https://yousutename.loca.lt
		});

		done();
	};
};
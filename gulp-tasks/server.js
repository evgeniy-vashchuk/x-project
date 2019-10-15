module.exports = function (gulp, plugins, path, isProduction) {
	return function (done) {
		plugins.browserSync({
			server: {
				baseDir: path.server
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
			//tunnel: true, tunnel: 'projectname', // Demonstration page: http://projectname.localtunnel.me
		});

		done();
	};
};
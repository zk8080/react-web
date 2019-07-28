const configProxy = require('http-proxy-middleware');
module.exports = app => {
	app.use(configProxy('/wms', { target: 'http://localhost:8080'}));
	// app.use(configProxy('/wms', { target: 'http://47.103.60.47:8080'}));

};

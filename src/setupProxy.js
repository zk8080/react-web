const configProxy = require('http-proxy-middleware');
module.exports = app => {
	app.use(configProxy('/wms', { target: 'http://localhost:8080'}));
};

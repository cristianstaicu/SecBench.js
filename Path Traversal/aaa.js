var config = {
    'localhost': {
        backend: __dirname + '/',
        frondend: __dirname + '/',
        baseTemp: 'index.html'
    }
};
var pkg = require('web-node-server');
pkg.start(config);
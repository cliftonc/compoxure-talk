'use strict';

var connect = require('connect');
var cookieParser = require('cookie-parser');
var morgan = require('morgan');
var serveStatic = require('serve-static');
var bodyParser = require('body-parser');
var connectRoute = require('connect-route');

var server = connect();

server.use(cookieParser());

if(process.env.logging !== 'false') { server.use(morgan('combined')); }

server.use(serveStatic('static', {'index': ['index.html', 'index.htm']}));
server.use(bodyParser.urlencoded({ extended: false }))

server.use(connectRoute(function (router) {

    router.get('/dynamic', function(req, res) {
		res.writeHead(200, {'Content-Type': 'text/html'});
    	res.end('This is some incredibly dynamic comment: ' + (new Date()));
    });

}));

server.listen(7001, 'localhost', function() {
    console.log('Example backend server on http://localhost:7001');
});

var express = require('express'),
	mongoskin = require('mongoskin'),
	swig = require('swig'),
	logfmt = require('logfmt'),
	routes = require('./routes');

var app = express(),
	db = mongoskin.db('', { safe: true });

app.set('sitename', 'Hong Kong Tech Meetup & Startups');
app.set('port', process.env.PORT || 5000);
app.use(logfmt.requestLogger());
app.use(function(req, res, next) {
	req.db = {};
	req.db.companies = db.collection('companies');
	next();
});
app.use(express.bodyParser());
app.use(express.static(__dirname + '/static'));

app.get('/', routes.index);
app.post('/', routes.add);

app.listen(app.get('port'), functino() {
	console.info('Server started on port: ' + app.get('port'));
});
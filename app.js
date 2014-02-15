var express = require('express'),
	mongoskin = require('mongoskin'),
	swig = require('swig'),
	logfmt = require('logfmt'),
	controllers = require('./controllers');

var app = express(),
	db = mongoskin.db(process.env.MONGOLAB_URI);

swig.setDefaults({ cache: false });

app.set('sitename', 'Hong Kong Tech Meetup & Startups');
app.set('port', process.env.PORT || 5000);

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.use(express.logger('dev'));
app.use(logfmt.requestLogger());
app.use(function(req, res, next) {
	req.db = {};
	req.db.companies = db.collection('companies');
	res.locals.sitename = app.get('sitename');
	next();
});
app.use(express.bodyParser());
app.use(express.static(__dirname + '/static'));

app.get('/', controllers.index);
app.post('/', controllers.add);
app.get('*', function(req, res) {
	res.send(404);
});

app.listen(app.get('port'));
exports.index = function(req, res, next) {
	req.db.companies.find({
		passed: true
	}).toArray(function(error, companies) {
		res.render('index', {
			sitename: 'HK Tech Meetup & Startup',
			companies: companies || []
		});
	})
};

exports.add = function(req, res, next) {
	console.log(req.body);
	if (!req.body || !req.body.name || !req.body.homepage)
		return next(new Error('Param missing'));
	req.db.companies.save({
		name: req.body.name,
		crunchbase: req.body.crunchbase,
		linkedin: req.body.linkedin,
		hiring: !(!req.body.hiring),
		jobs: req.body.jobs,
		passed: true
	}, function(err, company) {
		if (err) return next(err);
		if (!company) return next(new Error('Submit failed.'));
		console.info('A new company %s is saved.', company.name);
		res.send(200);
	});
};
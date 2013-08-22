
var Api = require('./api');

exports.initRoutes = function(app){
	Api.initApi(app);

	app.get('/', function(req, res){
		res.redirect('/manager');
	});

	app.get('/manager', function(req, res){
		res.render('scoreManager');
	});

	app.get('/scoreboard', function(req, res){
		res.render('scoreBoard');
	});


	console.log('Routes handling initialized');
};
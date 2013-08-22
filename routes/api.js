var mongoose = require('mongoose'),
	Score = mongoose.model('Score');

exports.initApi = function(app){
	app.get('/api/scoreboard/:id', function(req, res){ //get scoreboard by id
		Score.findOne({scoreBoardId: req.params.id}, function(err, scoreboard){
			if(!err)
				res.json(scoreboard);
		});
	});

	app.get('/api/scoreboard', function(req, res){ //get all scoreboard
		Score.find({}, function(err, scoreboards){
			if(!err)
				res.json(scoreboards);
				
		});
	});

	app.post('/api/scoreboard', function(req, res){ //add scoreboard
		var scoreboardPosted = req.body.scoreboard
		var scoreboard = new Score({
			scoreBoardId: scoreboardPosted.scoreboardId,
			sport: scoreboardPosted.sport,
			homeTeam: scoreboardPosted.homeTeam,
			awayTeam: scoreboardPosted.awayTeam,
		});

		scoreboard.save(function(err){
			res.end('OK');
		});
	});

	app.put('/api/scoreboard/:id', function(req, res){ //edit scoreboard by id
		var scoreboard = req.body.scoreboard
		Score.update({scoreBoardId: id}, {
			homeTeam: scoreboard.homeTeam,
			awayTeam: scoreboard.awayTeam
		}, function(err){
			if(!err)
				res.end('OK');
		});
	});

	app.delete('/api/scoreboard/:id', function(req, res){ //delete scoreboard by id
		Score.remove({scoreBoardId: req.params.id}, function(err){
			if(!err)
				res.end('OK');
		});
	});


};
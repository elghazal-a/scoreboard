
/**
 * Module dependencies.
 */

var express = require('express')
  , app = express()
  , http = require('http')
  , server = http.createServer(app)
  , mongoose = require('mongoose')
  , models = require('./models')
  , routes = require('./routes')
  , path = require('path')
  , io = require('socket.io').listen(server);

app.configure(function(){
  app.set('port', process.env.PORT || 8000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
  app.set('dbUri', 'mongodb://localhost/devScoreBoard');
});


app.configure('production', function(){
  this.use(express.errorHandler())
  app.set('dbUri', 'mongodb://localhost/scoreBoard');
});

/*
  Database handling
*/
models.createDb(mongoose, app, function() {
    mongoose.connect(app.get('dbUri'));
});

/*
  Routes handling
*/
routes.initRoutes(app);


/*
  Websocket
*/
//require('./socket')(io, 'scoreManager');

server.listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

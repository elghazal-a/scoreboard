var scoreboardSocket = require('./scoreboardSocket');

module.exports = function(io, route){
	var socket = server.io.of('/' + route),
	socket.on('connection', function(mySocket){
		return handleMySocket(mySocket, socket, route);
	});


	function handleMySocket(mySocket, socket, route){

		mySocket.on('scoreboard:delete', function(scoreboardId){
			delete(io.namespaces['/scoreboard/' + scoreboardId]);
		});

		mySocket.on('scoreboard:create', function(newTable, callbackClient){
		  newTable.prop = {};
		  newTable.prop.email = sessionUser.email;
		  newTable.prop.username = sessionUser.username;
		  var mySocketTable = tableSocket.createScoreboardSocket(gameName, socketRoom, newTable, callbackClient, 
		    function(routeTable)
		    {
		      newTable.routeTable = routeTable;
		      mySocket.broadcast.emit('table:created', newTable);
		    });
		  
		});
		
	}
}


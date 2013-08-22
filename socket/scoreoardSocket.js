var mongoose = require('mongoose'),
Score = mongoose.model('Score');


function handleMySocketTable(mySocket, socketRoom){


  mySocket.on('player:takePlace', function(name, callback){
    game.emit('player:takePlace', mySocket, callback);
  });

  mySocket.on('player:play', function(data, callback){
    game.emit('player:play', mySocket, data, callback);
  });

    
}


exports.createScoreboardSocket = function(scoreboardId, newTable, callbackClient, callbackServer)
{
  var routeTable = require("crypto").createHmac("sha1", "pass").update(new Date().getTime() + newTable.nameTable).digest("hex");
  newTable.routeTable = routeTable;

  var table = new Table({
        gameName: gameName, 
        routeTable: routeTable,
        nameTable: newTable.nameTable,
        prop: {email: newTable.prop.email, username: newTable.prop.username},
        nbrPlayers: newTable.nbrPlayers,
        remainingPlayers: newTable.nbrPlayers,
        prive: newTable.prive                                        
      });

  Room.addTable(gameName, newTable, function(err){
    if(!err){
        table.save(function(err, table){
        if(!err){
          console.log("table created");
          var socketScoreboard = server.io.of('/scoreboard' + scoreboardId);

          
          socketScoreboard.on('connection', function(mySocket){
            return handleMySocketTable(mySocket);
          }); 
          
          //Dire au proprietaire de la table que sa table est prete
          callbackClient(routeTable);
          callbackServer(routeTable); // Ainsi aux autres joueurs
          return socketTable; 

        }

      });
    }

  });
}

var Score = require('./Score');

function createDb(mongoose, app, fn) {
  console.log('Models defined');
	if(typeof fn == 'function') fn();
  console.log('Database connection established with: ' + app.get('dbUri') );
}

exports.createDb = createDb;

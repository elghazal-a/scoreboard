// The Scores model
 
var mongoose = require('mongoose')
, Schema = mongoose.Schema
, ObjectId = Schema.ObjectId;
 
var ScoreSchema = new Schema(
{
  scoreBoardId: {type: Number, unique: true }, 
  sport: String,
  homeTeam: Schema.Types.Mixed,
  awayTeam: Schema.Types.Mixed,
  date: Date
});

ScoreSchema.index({scoreBoardId: 1}, {unique : true, dropDups : true});
 
mongoose.model('Score', ScoreSchema);

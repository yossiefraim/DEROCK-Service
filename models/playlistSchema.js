var mongoose = require('mongoose'),
    schema = mongoose.Schema;

var songIdSchema = new schema({
        songId:Number
    });


var playlistSchema = new schema({
    _id:String,
    userId:Number,
    PlayListName:String,
    songs:[songIdSchema],
    likes:Number,
    genre:String,
    favorite:Boolean,
    recomendeSacle:Number 
    },{collection:'or'});

module.exports = playlistSchema;
var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    playlistSchema = new schema({
    id:Number,
    PlayListName:String,
    songs:[
        {
            songId:Number
        }
    ],
    likes:Number,
    favorite:Boolean,
    recomendeSacle:Number 
    });
module.exports = playlistSchema;
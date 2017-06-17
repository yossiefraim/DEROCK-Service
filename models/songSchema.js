var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    songSchema = new schema({
    id:Number,
    songName:String,
    ArtistName:String,
    albumId:Number,
    likes:Number,
    favorite:Boolean,
    genre:String,
    recomendeSacle:Number 
    });
module.exports = songSchema;
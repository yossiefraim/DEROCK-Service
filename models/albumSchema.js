var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    albumSchema = new schema({
    id:Number,
    albumName:String,
    ArtistName:String,
    songs:[
        {
            songId:Number
        }
    ],
    albumDateOfIssue:String,
    likes:Number,
    favorite:Boolean,
    genre:String,
    recomendeSacle:Number
    });
module.exports = albumSchema;
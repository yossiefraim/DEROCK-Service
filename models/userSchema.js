var mongoose = require('mongoose'),
    schema = mongoose.Schema,
    userSchema = new schema({
    id:Number,
    recomendeSacle:Number,
    favoriteSongs: [
        {
            songId: Number
        }
    ],
    favoriteAlbums:[
        {
            albumId:Number
        }
    ],
    playLists:[
        {
            playlistId:Number
        }
    ]
    });
module.exports = userSchema;

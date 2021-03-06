const mongoose = require('mongoose'),
 conn = mongoose.connection;
//
var songsSchema = require('../models/songSchema');
var songs = conn.model('songs',songsSchema);
var userSongs = conn.model('userSongs',songsSchema);
 var userSchema = require('../models/userSchema');
 var users = conn.model('users',userSchema);
 var albumSchema = require('../models/albumSchema');
 var albums = conn.model('albums',albumSchema);
 var playlistSchema = require('../models/playlistSchema');
 var playlists = conn.model('playlists',playlistSchema,'playlists');
 
mongoose.Promise = global.Promise;

var scale;
var userId;
var results={};
var favorites={};
results.userFavoriteAlbums=[];
results.userFavoriteSongs=[];



var j=0;
var k=0;

exports.login = ((user_id)=>{
        let query = new Promise((resolve,reject)=>{
          users.findOne({ id: { $eq: user_id } }).exec(function(err,result){
              if (!err){
                if(result==null){
                  reject('error: no match');
                }else{
                  
                  setUserId(result.id);
                  setScale(result.recomendeSacle);
                  favorites.favoriteSongs=result.favoriteSongs;
                  favorites.favoriteAlbums=result.favoriteAlbums; 
                  resolve(this.getScale(),this.getUserId());
                }
              }
              else{
                reject('error: ${err}');
              }
          });         

        });
        return query.then((scal,id)=>{
          let userSongData = new Promise((resolve,reject)=>{
            songs.find({ $and: [ { recomendeSacle: { $gt: scal-2} }, { recomendeSacle: { $lt: scal+2 } } ]}).exec(function(err,result){
                if(!err){
                  if(result==null){
                    reject('error: ${err}');
                  }
                  else{
                    results.userRecomendedSongs=result;
                    resolve(result);
                  }
                }
                else{
                  reject('error: ${err}');
                }
            });
      });
          let albumData = new Promise((resolve,reject)=>{
            albums.find({ $and: [ { recomendeSacle: { $gt: scal-2} }, { recomendeSacle: { $lt: scal+2 } } ]}).exec(function(err,result){
                if(!err){
                  if(result==null){
                    reject('error: ${err}');
                  }
                  else{
                    results.userRecomendedAlbums=result;
                    resolve(result);
                  }
                }
                else{
                  reject('error: ${err}');
                }
            });
      });
      let playlistData = new Promise((resolve,reject)=>{
              playlists.find({userId:{$eq:user_id}}).exec(function(err,result){
                if(!err){
                  if(result==null){
                    reject('error: ${err}');
                  }
                  else{
                    results.userPlaylist=result;
                    resolve(result);
                  }
                }
                else{
                  reject('error: ${err}');
                }
            });
      });
      let userFavSongs = new Promise((resolve,reject)=>{
            for(i in favorites.favoriteSongs){

              songs.find({id:{$eq:favorites.favoriteSongs[i].songId}}).exec(function(err,result){
                if(!err){
                  if(result==null){
                    reject('error: ${err}');
                  }
                  else{
                    results.userFavoriteSongs[j]={result};
                    j=j+1;
                    resolve('work');
                  }
                }
                else{
                  reject('error: ${err}');
                }
            });
          }
          j=0;   

        });
        let userFavalbums = new Promise((resolve,reject)=>{
            for(i in favorites.favoriteAlbums){

              albums.find({id:{$eq:favorites.favoriteAlbums[i].albumId}}).exec(function(err,result){
                if(!err){
                  if(result==null){
                    reject('error: ${err}');
                  }
                  else{
                    results.userFavoriteAlbums[k]={result};
                    k=k+1;
                    resolve('work');
                  }
                }
                else{
                  reject('error: ${err}');
                }
            });
          } 
          k=0;   
        });       
      return results;
    }).catch((fromReject)=>{
          return fromReject;
        });
});
exports.addSong = ((user_id,add_song_id)=>{
  let query = new Promise((resolve,reject)=>{
    users.update({id:user_id},{$addToSet:{ favoriteSongs:{ $each:[{"songId":add_song_id}]}}}).exec(function(err,result){
      if(!err){
                  if(result==null){
                    reject('error: ${err}');
                  }
                  else{
                    resolve('work');
                  }
                }
                else{
                  reject('error: ${err}');
                }
    });
    return resolve();
  }).catch((fromReject)=>{
    return fromReject;
  });

});
exports.removeSong = ((user_id,remove_song_id)=>{
  let query = new Promise((resolve,reject)=>{
    users.update({id:user_id},{$pull:{favoriteSongs:{"songId":remove_song_id}}}).exec(function(err,result){
      if(!err){
                  if(result==null){
                    reject('error: ${err}');
                  }
                  else{
                    resolve('work');
                  }
                }
                else{
                  reject('error: ${err}');
                }
    });
    return resolve();
  }).catch((fromReject)=>{
    return fromReject;
  });

});

 exports.getAllSongs = (()=>{
         let query = new Promise((resolve,reject)=>{
           songs.find({}).exec(function(err,result){
               if (!err){
                 if(result==null){
                   reject('error: no match');
                 }else{
                   resolve(result);
                 }
               }
               else{
                 reject('error: ${err}');
               }
           });

        });
         return query.then((fromReslove)=>{
           return fromReslove;
         }).catch((fromReject)=>{
           return fromReject;
         });
 }); 
  exports.getAllAlbums = (()=>{
         let query = new Promise((resolve,reject)=>{
           albums.find({}).exec(function(err,result){
               if (!err){
                 if(result==null){
                   reject('error: no match');
                 }else{
                   resolve(result);
                 }
               }
               else{
                 reject('error: ${err}');
               }
           });

        });
         return query.then((fromReslove)=>{
           return fromReslove;
         }).catch((fromReject)=>{
           return fromReject;
         });
 }); 


setScale=((temp)=>{
 this.scale=temp;
 return;
});
getScale=(()=>{
 return this.scale;
});
setUserId=((temp)=>{
 this.userId=temp;
 return;
});
getUserId=(()=>{
 return this.userId;
});


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

exports.login = ((user_id)=>{
        let query = new Promise((resolve,reject)=>{
          users.findOne({ id: { $eq: user_id } }).exec(function(err,result){
              if (!err){
                if(result==null){
                  reject('error: no match');
                }else{

                  setUserId(result.id);
                  setScale(result.recomendeSacle); 
                  console.log("scale in login "+this.getScale());
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
                    console.log("user songs scale "+scal);
                    results.userSongs=result;
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
                    console.log("user songs scale "+scal);
                    results.userAlbums=result;
                    resolve(result);
                  }
                }
                else{
                  reject('error: ${err}');
                }
            });
      });
      let playlistData = new Promise((resolve,reject)=>{
              playlists.find({id:{$eq:id}}).exec(function(err,result){
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
      return results;
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
// exports.getData = (()=>{
//         let query = new Promise((resolve,reject)=>{
//           songs.find({ $and: [ { recomendeSacle: { $gt: 4 } }, { recomendeSacle: { $lt: 7 } } ]}).exec(function(err,result){
//               if (!err){
//                 if(result==null){
//                   reject('error: no match');
//                 }else{
//                   resolve(result);
//                 }
//               }
//               else{
//                 reject('error: ${err}');
//               }
//           });

//         });
//         return query.then((fromReslove)=>{
//           return fromReslove;
//         }).catch((fromReject)=>{
//           return fromReject;
//         });
// }); 

// exports.userSongsData = (()=>{
//             let userSongData = new Promise((resolve,reject)=>{
//               console.log("scale in user "+scale);
//               songs.find({ $and: [ { recomendeSacle: { $gt: 5-2} }, { recomendeSacle: { $lt: 5+2 } } ]}).exec(function(err,result){
//                 if(!err){
//                   if(result==null){
//                     reject('error: ${err}');
//                   }
//                   else{
//                     console.log("user songs scale "+this.getScale());
//                     resolve(result);
//                   }
//                 }
//                 else{
//                   reject('error: ${err}');
//                 }
//             });
//           }); 
//           return userSongData.then((fromReslove)=>{
//           return fromReslove;
//         }).catch((fromReject)=>{
//           return fromReject;
//         });

// });


//get all songs
// exports.getData = (()=>{
//         let query = new Promise((resolve,reject)=>{
//           songs.find({}).exec(function(err,result){
//               if (!err){
//                 if(result==null){
//                   reject('error: no match');
//                 }else{
//                   resolve(result);
//                 }
//               }
//               else{
//                 reject('error: ${err}');
//               }
//           });

//         });
//         return query.then((fromReslove)=>{
//           return fromReslove;
//         }).catch((fromReject)=>{
//           return fromReject;
//         });
// });  

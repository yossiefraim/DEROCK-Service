const mongoose = require('mongoose'),
 conn = mongoose.connection;
//
var songsSchema = require('../models/songSchema');
var songs = conn.model('songs',songsSchema);
 var userSchema = require('../models/userSchema');
 var users = conn.model('users',userSchema);
 var albumSchema = require('../models/albumSchema');
 var albums = conn.model('albums',albumSchema);
 var playlistSchema = require('../models/playlistSchema');
 var playlists = conn.model('playlists',playlistSchema);
mongoose.Promise = global.Promise;


exports.getData = (()=>{
        let query = new Promise((resolve,reject)=>{
          songs.find({ $and: [ { recomendeSacle: { $gt: 4 } }, { recomendeSacle: { $lt: 7 } } ]}).exec(function(err,result){
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
exports.login = (()=>{
        let query = new Promise((resolve,reject)=>{
          users.findOne({ id: { $eq: 1 } }).exec(function(err,result){
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

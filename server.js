const express = require('express'),
      app = express(),
      data = require('./controllers/dataController'),
      mongoose = require('mongoose'),
      port = process.env.PORT || 3000;

mongoose.Promise = global.Promise;

app.set('port',port);
app.use('/', express.static('./public'));//for API
app.use(
    (req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers",
                "Origin, X-Requested-With, Content-Type, Accept");
    res.set("Content-Type", "application/json");
    next();
});
app.get('/',
  (req,res)=>{
    console.log('home page');
  });
app.get('/getsongs',
    (req,res) =>{
      console.log('path found');
      let succ = new Promise((resolve,reject)=>{ 
      if(true)
      {
        console.log('1');
        resolve(data.getData());
      }else{
        reject('error');
      }
    });

    succ.then((fromResolve)=>{
      console.log('2');
      res.status(200).json(fromResolve);
    }).catch((fromReject)=>{
      res.status(200).json(fromReject);
    });  
});
app.post('/login',
    (req,res) =>{
      console.log('path found');
      let succ = new Promise((resolve,reject)=>{ 
      if(true)
      {
        resolve(data.login(req.body.id));
      }else{
        reject('error');
      }
    });

    succ.then((fromResolve)=>{
      res.status(200).json(fromResolve);
    }).catch((fromReject)=>{
      res.status(200).json(fromReject);
    });  
});

app.get('/userRecomendedSongs',
    (req,res) =>{
      console.log('path found');
      let succ = new Promise((resolve,reject)=>{ 
      if(true)
      {
        resolve(data.userSongsData());
      }else{
        reject('error');
      }
    });

    succ.then((fromResolve)=>{
      res.status(200).json(fromResolve);
    }).catch((fromReject)=>{
      res.status(200).json(fromReject);
    });  
});



app.listen(port,
() => {
console.log(`listening on port ${port}`);
console.log("url error"+ app.url);
});
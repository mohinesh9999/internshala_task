var express = require('express');
var router = express.Router();
var firebase=require('firebase')
var firebaseConfig=require('./fc')
firebase.initializeApp(firebaseConfig)
let db=firebase.database()
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/login', function(req, res, next) {
  console.log(firebaseConfig);
  
  res.render('login');
});
router.get('/signup', function(req, res, next) {
  res.render('signup');
});
router.post('/check', function(req, res, next) {
  
  db.ref('is/'+req.body.mob).once('value',function(snapshot){
    if(snapshot.val()==null){
      res.send('wrong number')
    }
    else if(snapshot.val().pass==req.body.pass){
      res.send('correct credentials')
    }
    else{
      res.send('wrong password')
    }
  })
  
});
router.post('/check1', function(req, res, next) {
  // f.firestore().collection('user').doc(req.body.mob).set(req.body)
  console.log(req.body);
  try{
    if(req.body['pass']===req.body['vpass']){
      db.ref('is/'+req.body.mob).once( 'value',function(snapshot){
        if(snapshot.val()===null){
          db.ref('is/'+req.body.mob).set({name:req.body.name,pass:req.body.pass,email:req.body.email})
          res.send("signup successful")
        }
        else{
          res.send('number already registered')
        }
      })
    }
    else{
      res.send('password didnt match')
    }
  }
  catch(e){
    console.log(e)
    res.send("some error occured")
  }
});

module.exports = router;

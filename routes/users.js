const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');
var Sequelize = require('sequelize');

var User_seq = require('../models/seq_user');//(Sequelize);

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
    fbuserid: req.body.fbuserid
  });

  User_seq.addUser(newUser, (err, user) => {
    // User.addUser(newUser, (err, user) => {
    if (err) {
      console.log("err&&&&&&&&&&&&&&&&&&&&&");
      res.json({ success: false, msg: 'Failed to register user' });
    } else {
      console.log('NO err$$$$$$$$$$$$$$');
      res.json({ success: true, msg: 'User registered' });
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username + " $$$$$$$$");
  console.log(password + " $$$$$$$$\n");
  User_seq.getUserByUsername(username, (err, user) => {
    // User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    console.log(user + "%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%");
    if (!user) {
      console.log("blalaslasada==========================");
      return res.json({ success: false, msg: 'User not found' });
    }
    User_seq.comparePassword(password, user.password, (err, isMatch) => {
      // User.comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT ' + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      }
      else {
        return res.json({ success: false, msg: 'Wrong password' });
      }
    });
  });
});

// Profile
// router.get('/profile', (req, res, next) => {
//   res.send("Profile");
// });
//here the additional param locks the profile route
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
  // console.log(req.user);
  // console.log(req);
  res.json({ user: req.user });
});


router.get('/fbhello', (req, res, next) => {
  // console.log(req);
  // console.log(res);
  // console.log(req);

  // User.find({},(err,data)=>{
  //   if(err) res.json(err);
  //   else res.render('index',{users:data});
  // });
  console.log("Came back from auth");
  res.send('FBLogin')
});

router.get('/loginfailure', (req, res, next) => {
  console.log("IN Login FAilure");
  res.send('LoginFAILED')
});

//fb login
router.get('/fblogin',
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
  // ,  function(req,res){
  //    console.log("fblogin");
  //    res.json({"name":"sdada"});
  //  }
);

// router.get('/fbnlogin',(req, res, next) =>{
//   res.send("NOT LOGGEdIN")
// });

router.get('/fbreturn',
  // passport.authenticate('facebook', { failureRedirect: '/fblogin' }),
  passport.authenticate('facebook', { successRedirect: '/users/fbhello', failureRedirect: '/' })/*,
  function (req, res) {
    console.log(req);
    res.redirect('/');
  }*/);
//google login
router.get('/googlogin',
  passport.authenticate('google', {
    scope: ['profile', 'email', 'https://www.googleapis.com/auth/plus.login'],
    // accessType: 'offline',
    approvalPrompt: 'force'
  }));

router.get('/google/callback',
  passport.authenticate('google', { successRedirect: '/users/fbhello', failureRedirect: '/' })/*,
  function (req, res) {
    console.log(req);
    res.redirect('/');
  }*/);
// router.get('/gogllogin',
// passport.authenticate('google'));

// router.get('/profilefb',
//   // require('connect-ensure-login').ensureLoggedIn(),
//   function(req, res){
//     console.log("profilefb");
//     console.log(req);
//     res.render('profile', { user: req.user });
//   });
// router.get('/fblogin', (req, res, next) => {
//   res.send("FACEBOOK");
// });
//linkedin login
router.get('/linkedinlogin',
  passport.authenticate('linkedin', { state: 'SOME STATE' }),
  function (req, res) {
    // The request will be redirected to LinkedIn for authentication, so this 
    // function will not be called. 
  });
router.get('/linkedin/callback',
  passport.authenticate('linkedin', {
    successRedirect: '/users/fbhello',
    failureRedirect: '/'
  }));

///
router.post('/seq', (req, res, next) => {
  //  const user_seq = User_seq.findAll({})
  //  .then((electronics) => electronics.forEach((user) => {
  //   console.log(user.get('my_id')+' '+ user.get('name'));
  // }))
  //  .catch((err) => console.log(err));
  //  res.json(user_seq);
  // User_seq.create({//inserting a row
  //     name: "name2",
  //     email: "name2",
  //       username:"name2",
  //       password: "name2",
  //       fbuserid: "name2"
  //   });
  //  let newUser = {
  //   name: req.body.name,
  //   email: req.body.email,
  //   username: req.body.username,
  //   password: req.body.password,
  //   fbuserid: req.body.fbuserid

  // };
  // console.log(newUser);
  // User_seq.addUser(newUser, (err, user) => {
  //   if (err) {
  //     res.json({ success: false, msg: 'Failed to register user' });
  //   } else {
  //     res.json({ success: true, msg: 'User registered' });
  //   }
  // });
  // var array = [];

  // console.log(array.length);
  // console.log(newUser);
  // var promise1 = User_seq.findAll({
  //   where: {
  //     username: req.body.username
  //   }
  // });
  // var b = promise1.then(onFulfilled, onRejected)
  // console.log(b);
  // promise1.then(function(data){
  //  console.log(data);

  // }, console.error);
  // promise2 = promise1.then(function(data){
  //       data.forEach(function (usr) { 
  //       //  console.log(usr.dataValues);
  //        console.log("=======================================");
  //        array.push( {"id":usr.dataValues.id});
  //         // console.log("array$$$$"+array );
  //         // console.log(array.length);
  //       //  console.log(array);
  //     });
  //     return array;
  // },console.error);
  // promise2.then(data,console.error);
  // console.log("#######");
  // .then(function (data) {
  //    data.forEach(function (usr) { 
  //      console.log(usr.dataValues);
  //      console.log("=======================================");
  //      array.push( {"id":usr.dataValues.id});
  //       console.log("array$$$$"+array );
  //       console.log(array.length);
  //     //  console.log(array);
  //     }) 
  //   })

  // const username = req.body.username;
  // const password = req.body.password;
  // User_seq.comparePassword(password, user.password, (err, isMatch) => {
  //   if (err) throw err;
  //    console.log("user===" + user.username);

  // });

});
module.exports = router;

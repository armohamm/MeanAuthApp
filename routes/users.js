const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const User = require('../models/user');

// Register
router.post('/register', (req, res, next) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });

  User.addUser(newUser, (err, user) => {
    if (err) {
      res.json({ success: false, msg: 'Failed to register user' });
    } else {
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
  User.getUserByUsername(username, (err, user) => {
    if (err) throw err;
    if (!user) {
      console.log("blalaslasada==========================");
      return res.json({ success: false, msg: 'User not found' });
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
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
      } else {
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
  console.log(req);
  // console.log(res);
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

//fb login
router.get('/fblogin',
  passport.authenticate('facebook', { scope: ['public_profile','email'] })
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
  passport.authenticate('google', { scope: ['profile','email','https://www.googleapis.com/auth/plus.login'] }));

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

module.exports = router;

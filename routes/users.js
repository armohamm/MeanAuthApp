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
    if(err){
      res.json({success: false, msg:'Failed to register user'});
    } else {
      res.json({success: true, msg:'User registered'});
    }
  });
});

// Authenticate
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username+" $$$$$$$$");
  console.log(password+" $$$$$$$$\n");
  User.getUserByUsername(username, (err, user) => {
    if(err) throw err;
    if(!user){
      console.log("blalaslasada==========================");
      return res.json({success: false, msg: 'User not found'});
    }

    User.comparePassword(password, user.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

// Profile
// router.get('/profile', (req, res, next) => {
//   res.send("Profile");
// });
//here the additional param locks the profile route
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  // console.log(req);
  // console.log(res);
  res.json({user: req.user});
});


router.get('/reguser',(req, res, next) => {
  // console.log(req);
  // console.log(res);
  // console.log(req);
  
  // User.find({},(err,data)=>{
  //   if(err) res.json(err);
  //   else res.render('index',{users:data});
  // });
  res.send('ALLUSERS')
});

module.exports = router;

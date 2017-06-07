const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');

module.exports = function(passport){
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  //  console.log("============================================");
  // console.log(opts.jwtFromRequest + " ========");
  //  console.log("============================================");

  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
  // console.log("===================$$$$$$$=========================");
  // console.log(jwt_payload);
  //  console.log("===============$$$$$=============================");
    User.getUserById(jwt_payload._doc._id, (err, user) => {
      if(err){
        return done(err, false);
      }

      if(user){
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}

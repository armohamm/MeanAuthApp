const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');
var User_seq = require('../models/seq_user');//(Sequelize

module.exports = function (passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.secretOrKey = config.secret;
  //  console.log("============================================");
  // console.log(opts.jwtFromRequest + " ========");
  //  console.log("============================================");

  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    // console.log("===================$$$$$$$=========================");
    console.log("THis is Strategy callback");
    // console.log("PAYLOAD : "+jwt_payload);
    //  console.log(jwt_payload.customer_id);
    //  console.log("===============$$$$$=============================");
    User_seq.getUserById(jwt_payload.customer_id, (err, user) => {
    // User.getUserById(jwt_payload._doc._id, (err, user) => {
      if (err) {
        return done(err, false);
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  }));
}

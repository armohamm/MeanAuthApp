var express = require('express');
// var passport = require('passport');
var Strategy = require('passport-google-oauth').OAuth2Strategy;
const User = require('../models/user');

const auth_ids = require('../soc_key/auth_key');


module.exports = function (passport) {

    // used to serialize the user for the session
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function (id, done) {
        // User.findById(id, function(err, user) {
        done(err, user);
        // });
    });


    passport.use(new Strategy({
        clientID: auth_ids.google.clientID,
        clientSecret: auth_ids.google.clientSecret,
        callbackURL: 'http://localhost:3000/users/google/callback',

    },
        function (accessToken, refreshToken, profile, cb) {
            process.nextTick(function () {
                console.log("Googleprofile$$$$$$$$$");
            });
            return cb(null, profile);
        }));

}

var express = require('express');
// var passport = require('passport');
var Strategy = require('passport-linkedin-oauth2').Strategy;
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

    // passport.use(new LinkedInStrategy({
    //     clientID: LINKEDIN_KEY,
    //     clientSecret: LINKEDIN_SECRET,
    //     callbackURL: "http://127.0.0.1:3000/auth/linkedin/callback",
    //     scope: ['r_emailaddress', 'r_basicprofile'],
    // }, function (accessToken, refreshToken, profile, done) {
    //     // asynchronous verification, for effect... 
    //     process.nextTick(function () {
    //         // To keep the example simple, the user's LinkedIn profile is returned to 
    //         // represent the logged-in user. In a typical application, you would want 
    //         // to associate the LinkedIn account with a user record in your database, 
    //         // and return that user instead. 
    //         return done(null, profile);
    //     });
    // }));

    passport.use(new Strategy({
        clientID: auth_ids.linkedin.clientID,
        clientSecret: auth_ids.linkedin.clientSecret,
        callbackURL: 'http://localhost:3000/users/linkedin/callback',
        scope: ['r_emailaddress', 'r_basicprofile'],

    },
        function (accessToken, refreshToken, profile, cb) {
            process.nextTick(function () {
                // To keep the example simple, the user's LinkedIn profile is returned to 
                // represent the logged-in user. In a typical application, you would want 
                // to associate the LinkedIn account with a user record in your database, 
                // and return that user instead. 

                console.log("Linkedinprofile$$$$$$$$$");
            });
            console.log("In Passport Strategy####################################");
            console.log(profile);
            return cb(null, profile);
        }));

}

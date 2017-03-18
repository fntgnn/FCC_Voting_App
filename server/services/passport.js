const passport = require('passport');
const User = require('../models/user');

const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

//create local strategy
const LocalStrategy = require('passport-local');

const localOptions = { usernameField: 'email' };
const localLogin = new LocalStrategy(localOptions, function(email, password, done){
    //verify username password, call done with the user if it is correct
    User.findOne({email: email}, function(err, user) {
        if(err) { return done(err); }
        if(!user) { return done(null, false); }
        
        user.comparePassword(password, function(err, isMatch){
            if(err) { return done(err, null); }
            if(!isMatch) { return done(null, false); }
            
            return done(null, user);
        });
    });
});

//set option for strategy. Quando una richiesta arriva, guarda nel header che si chiama authorization
const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret
};

//create strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
    //payload è il decoded jwtToken
    User.findById(payload.sub, function(err, user){
       if(err) { return done(err, false); }
        
        if(user){
            done(null, user);
        } else {
            done(null, false);
        }
        
    });
});

//tell passport to use this strategy
passport.use(jwtLogin);
passport.use(localLogin);
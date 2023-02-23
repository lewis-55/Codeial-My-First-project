  const passport = require('passport');
  const JWTStrategy = require('passport-JWT').Strategy;
  const ExtractJWT = require('passport-JWT').ExtractJwt;

  const User = require('../models/user');

  let opts = {
    JWTFromRequest : ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOfkey : 'codeial'
  }
  passport.use(new JWTStrategy(opts,function(jwtPayLoad,done){

    user.findById(jwtPayLoad._id,function(err,user){
        if(err){ console.log('Error in finding user from JWT'); return;}
        if(user){
            return done(null,user);
        } else {
            return done(null,false);
        }
    })
  }));

  module.exports = passport;
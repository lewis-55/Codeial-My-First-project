   const passport = require('passport');
   const LocalStrategy = require('passport-local').Strategy;
   const user = require('../models/user');

   // authentication using passport
   passport.use(new LocalStrategy({
       usernameField: 'email',
       passReqToCallback : 'true'
   },
     function(req,email,password,done){
        // find a user and establish the identity
        user.findOne({email:email},function(err,user){
        if(err){
            req.flash('error',err);
            return done(err);
        }
        if(!user || user.password != password){
            req.flash('error','Invalid Username/Password');
            return done(null,false);
        }
        return done(null,user);
        });
     }
   ));

   //serializing the user to decide which key is to be kept in the cookies
     passport.serializeUser(function(user,done){
        done(null,user.id);
     });

   //deserializing the user from the key in the cookies

   passport.deserializeUser(function(id,done){
      user.findById(id,function(err,user){
     if(err){
        console.log('Error in finding the user --> passport');
            return done(err);  
     }
     return done(null,user);
      });
   });

// check if the user is authenticated
passport.checkAuthentication = function(req,res,next){
// if the user is sign in, then pass the request to the next function(controller's action)
  if(req.isAuthenticated){
    return next();
  }
  // if user is not signed in 
  return res.redirect('/users/sign-in');
}
passport.setAuthenticateUser = function(req,res,next){
   if(req.isAuthenticated()){
      // req.user contains the current signed in the user from the session cookie and
      // we just sending this to the locals for the view
      res.locals.user = req.user;
   }
   next();
}
   module.exports = passport;
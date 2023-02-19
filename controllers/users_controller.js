  const { response } = require('express');
const user = require('../models/user');
const User = require('../models/user');


module.exports.profile = function(req,res){
  user.findById(req.params.id,function(err,user){
    return res.render('user_profile',{
      title:'User profile',
      profile_user : user

     });
  });
       }
  
     module.exports.update = function(req,res){
      if(req.user.id == req.params.id){
        user.findByIdAndUpdate(req.params.id,req.body,function(req,user){
          return res.redirect('back');
        });
      }else{
        return res.status(401).send('Unauthorized');
      }
     }
       // render the sign up page
   module.exports.signUp = function(req, res){
      if(req.isAuthenticated()){
       return res.redirect('/user/profile');
      }
       return res.render('user_sign_up',{
        title: "Codeial | Sign Up"
       })
   }
   // render the sign in page
   module.exports.signIn = function(req, res){
    
    if(req.isAuthenticated()){
      return  res.redirect('/user/profile');
    }

    return res.render('user_sign_in',{
     title: "Codeial | Sign in"
    })
}

// get the sign up data
module.exports.create = function(req,res){
  if(req.body.password != req.body.confirm_password){
    return res.redirect('back');
  }
  user.findOne({email : req.body.email},function(err,user){
    if(err){console.log('erroe in finding user in singing up');return}

    if(!user){
        user.create(res.body,function(err,user){
            if(err){console.log('erroe in finding user in singing up');return}

            return res.redirect('/user/sign-in');
        })
    } else {
        return res.redirect('back');
    }
  });
}

// sing in and create the sessions for the user
module.exports.createSession = function(req, res){
    return res.redirect('/');
}

module.exports.destorySession = function(req,res){
      req.logout();
  return res.redirect('/');
}
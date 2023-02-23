  const { response } = require('express');
  const fs = require('fs');
  const path = require('path');

 // let's keep it same as before  
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
  
     module.exports.update = async function(req,res){
    //   if(req.user.id == req.params.id){
    //     user.findByIdAndUpdate(req.params.id,req.body,function(req,user){
    //       return res.redirect('back');
    //     });
    //   }else{
      //req.flash('error','Unauthorized!');
    //     return res.status(401).send('Unauthorized');
    //   }
    if(req.user.id == req.params.id){
      
      try{
        let user = await user.findById(req.params.id);
        User.uploadedAvatar(req,res,function(err){
        if(err){ console.log('******Multer Error:',err)}

      user.name = req.body.name;
      user.email = req.body.email;
      if(req.file){
       
        if(user.avatar){
          fs.unlinkSync(path.join(__dirname,'..',user.avatar));
        }

  // this is saving the path of the uploaded file into avatar field in the user
        user.avatar = User.avatarPath + '/' + req.file.filename;
      }
      user.save();
      res.redirect('back');
        });     



      } catch(err){ 
         req.flash('Error','err');
      return res.redirect('back');

      }


     } else {   
        req.flash('error','Unauthorized!');
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

// sign in and create the sessions for the user
module.exports.createSession = function(req, res){
  req.flash('sucess','Logged in Successfully');
    return res.redirect('/');
}

module.exports.destorySession = function(req,res){
      req.logout();
      req.flash('sucess','Logged out Successfully');
  return res.redirect('/');
}
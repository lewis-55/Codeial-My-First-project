    const post = require('../models/post');
      const user = require('../models/user');
   
      module.exports.home =  async function(req,res){

      try{
       // populate the user of each post
            let posts = await post.find({})
            // .sort('-createdAt')
            .populate('user')
            .populate({
                path: 'comments',populate :{
                    path: 'user'
                }
            });
            let users = await user.find({});

                return res.render('home',{
                    title : "Codeial | Home",
                    posts : posts,
                    all_users :  users
                 });
        
             return res.render('home',{
                title : "Codeial | Home",
                posts : posts
             });
            
        

      } catch {
         console.log('Error',err);
         return;
      }
    }

    // console.log(req.cookies);
    // res.cookie('user_id',25);

    // post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:" Codeial | Home",
    //         posts : posts
    //      });
    // });
    
    // populate the user of each posts
  

// module.exports.actionName = function(req,res){};

// using then 
// post.find({}).populate('comments').then(function());

// let post = post.find({}).populate('comments').exec();
// post.then();
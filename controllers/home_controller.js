    const post = require('../models/post');

module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',25);

    // post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:" Codeial | Home",
    //         posts : posts
    //      });
    // });
    
    // populate the user of each posts
    post.find({})
    .populate('user')
    .populate({
        path: 'comments',populate :{
            path: 'user'
        }
    })
    .exec(function(err,posts){
     return res.render('home',{
        title : "Codeial | Home",
        posts : posts
     });
    });

    
}

// module.exports.actionName = function(req,res){};


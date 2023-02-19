    const port = require('../models/post');
    const Comment = require('../models/comment');
 
 module.exports.create = async function(req,res){
      await posts.create({
       content : req.body.content,
       user : req.user._id
    });
          return  res.redirect('back');
 }


module.exports.destroy = function(req,res){
   post.findById(req.params.id,function(err,post){
    // .id means conevting the object id into the string
      if(post.user == req.used.id){
         post.remove();
         // there is a fuuction called deletemany for deleting the comments of the posts
         comment.deleteMany({post: req.params.id},function(err){
                return res.redirect('back');
         });
      }else{
         return res.redirect('back');
      }
   });
}
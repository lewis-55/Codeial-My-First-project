    const port = require('../models/post');
    const Comment = require('../models/comment');
 
 module.exports.create = async function(req,res){
   try{
      await posts.create({
         content : req.body.content,
         user : req.user._id
      });
            return  res.redirect('back');
   
} 
   catch(err){
       console.log('Error',err);
       return;
   }
    
 }

module.exports.destroy = async function(req,res){
   try{
      let post = await post.findById(req.params.id);

      if(post.user == req.used.id){
         post.remove();
         // there is a fuuction called deletemany for deleting the comments of the posts
          await comment.deleteMany({post: req.params.id});
                return res.redirect('back');
         
      }else{
         return res.redirect('back');
      }
      
   }catch(err){
       console.log('Error',err);
       return;
   }
}
    const port = require('../models/post');
    const Comment = require('../models/comment');
 
 module.exports.create = async function(req,res){
   try{
    let post =   await posts.create({
         content : req.body.content,
         user : req.user._id
      });
              if(req.xhr){
               return res.status(200).json({
                  data : {
                     post :post
                  },
                  message : "Post created!"
               })
              }


      req.flash('success','Post published!'); 
            return  res.redirect('back');
   
} 
   catch(err){
      req.flash('error','err');
       return res.redirect('back');
   }
    
 }

module.exports.destroy = async function(req,res){
   try{
      let post = await post.findById(req.params.id);

      if(post.user == req.used.id){
         post.remove();
         // there is a fuuction called deletemany for deleting the comments of the posts
          await comment.deleteMany({post: req.params.id});

          if(req.xhr){
            return res.status(200).json({
             data : {
               post_id : req.params.id
             },
             message : "Post Deleted"
            });
          }
          req.flash('success','Post and associated comments deleted');
                return res.redirect('back');
         
      }else{
         req.flash('success','You cannot delete this post!');
         return res.redirect('back');
      }
      
   }catch(err){
       req.flash('Error','err');
       return res.redirect('back');
   }
}
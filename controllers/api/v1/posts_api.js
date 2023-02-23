  const Posts = require('../../../models/post');
  const Comment = require('../../../models/comment');
module.exports.index = async function(req,res){
    let posts = await post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path: 'comments',populate :{
            path: 'user'
        }
    });      

    return res.json(200,{
    message : "Lists of posts",
    posts : posts
    });
  }

  module.exports.destroy = async function(req,res){
    try{
       let post = await post.findById(req.params.id);
 
       if(post.user == req.used.id){
          post.remove();
          // there is a fuuction called deletemany for deleting the comments of the posts
           await comment.deleteMany({post: req.params.id});
 
        
                 return res.json(200,{
                 message: "Posts and associated comments deleted successfully"
                 });
          
       }
       else{
          return res.json(200,{
            message : "Ypu caanot delete this posts!"
          })
       }
       
    }
    catch(err){
       console.log('*******',err);     

        return res.json(500,{
          message : "Internal server Error"
        });
    }
 }
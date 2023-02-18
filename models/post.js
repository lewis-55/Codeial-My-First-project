    const mongoose = require('mongoose');
    
    
    const userSchema = new mongoose.Schema({
        content : {
            type : string ,
            require : true
        },
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
        }
    },{
        timestamps : true
    });

    const post = mongoose.model('Post',postSchema);
    model.exports = Post;
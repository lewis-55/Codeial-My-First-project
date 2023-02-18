    const mongoose = require('mongoose');
const comment = require('./comment');
    
    
    const userSchema = new mongoose.Schema({
        content : {
            type : string ,
            require : true
        },
        user : {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'user'
        }
    },
    //  include the array of ids of all comments in this post schema itself
    comments [
        { type : mongoose.Schema.Types.ObjectId,
            ref : 'Comment'
        }
    ],
    {
        timestamps : true
    });

    const post = mongoose.model('Post',postSchema);
    model.exports = Post;
     const mongoose = reuire('mongoose');

const commentSchema = new mongoose.schema({
   content :{
    type : 'String',
    required : 'true'
   },
   // comments belonging to the user
   user :{
    type : 'mongoose.Schema.Types.objectId',
    ref:'user'
   },
   post :{
    type : 'mongoose.Schema.Types.objectId',
    ref:'post'
   },
   
    timestamps : 'true'
   
});

const comment = mongoose.model('comment',commentSchema);

module.exports = comment;


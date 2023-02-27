   const nodemailer = require('../config/nodemailer');

   // this is another way of exporting a method 
   exports.newComment = comment => {
    let htmlString = nodemailer.renderTemplate({comment: comment},'/commets/new_comment.ejs');

      nodemailer.trasnporter.sendMail({
         from : 'codeial.com',
         to : 'comment.user.email',
         subject : 'NEw comment published!',
         html : htmlString
      },(err,info)=>{
         if(err){
            console.log('Error in sending mail'); 
            return;
         }
         console.log('message send',info);
         return;
      });
   }
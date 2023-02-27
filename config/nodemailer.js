   const nodemailer = require('nodemailer');
   const ejs = require('ejs');
   const path = require('path');



   let trasnporter = nodemailer.createTransport({
     service : "gmail",
     secure : "false",
     port : "587",
     host : "smyp.gmail.com",
     auth : {
     user: "alcemy.cn18",
     password : "babli"
     }
   });

   let randerTemples = (data ,realtivePath) => {
    let mailHTML;
    ejs.renderFile(
        path(__dirname, '../views/mailer',realtivePath),
        data,
        function(err,template){
            if(err){ console.log('Error in rendering templates',err); return;}
           mailHTML = template; 
        }
        
    )
          return mailHTML;
   }
   module.exports = {
    trasnporter : trasnporter,
    renderTemplate : renderTemplate
   }
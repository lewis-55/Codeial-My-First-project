     module.exports.setFlash = function(res,req,next){
        res.locals.flash = {
            'success' : req.flash('success'),
            'error' : req.flash('error')
        }
        next();
     }
const isLoggedIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        return next();
    }else{
        req.flash('error','You need to login to do that');
        res.redirect('/login');
    }
}

module.exports = isLoggedIn;
const Comic = require('../models/comic');

const checkComicOwner = async (req,res,next)=>{
    if(req.isAuthenticated()){
        const comic = await Comic.findById(req.params.id).exec();
        console.log(comic.owner.id);
        console.log(req.user._id);
        if(comic.owner.id.equals(req.user._id)){
            res.render('comics_edit',{comic})
        }else{
            res.redirect("back")
        }
    }else{
        res.redirect('/login');
    }
}

module.exports = checkComicOwner;
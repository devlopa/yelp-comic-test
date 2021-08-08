const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');


router.get('/signup',(req,res)=>{
    res.render('signup');
});

router.post('/signup',async(req,res)=>{
    try{
        const newUser = await User.register(new User({
            username:req.body.username,
            email:req.body.email
        }),req.body.password);
        console.log(newUser);

        passport.authenticate('local')(req,res,()=>{
            res.redirect('/comics');
        })
    }catch(err){
        console.log(err);
        res.send(err);
    }
});

// login route
router.get('/login',(req,res)=>{
    res.render('login')
})
// login post route
router.post('/login',passport.authenticate('local',{
    successRedirect:'/comics',
    failureRedirect:'/login'
}))
// logout route
router.get('/logout',(req,res)=>{
    req.logout();
    res.redirect('/comics');
})

module.exports = router;

const express = require('express');
const router = express.Router({mergeParams:true});
const Comment = require('../models/comment');
const Comic = require('../models/comic');
const isLoggedIn = require('../utils/isLoggedIn');
const checkCommentOwner = require('../utils/checkCommentOwner');

router.get('/new',isLoggedIn,(req,res)=>{
    res.render('comments_new',{comicId:req.params.id})
});

router.post('/',isLoggedIn,async(req,res)=>{
        try{
        const comment = Comment.create({
            user:{
                id:req.user._id,
                username:req.user.username

            },
            text:req.body.text,
            comicId:req.body.comicId
        });
        req.flash('success','Successfully created comic');
        res.redirect(`/comics/${req.body.comicId}`);
    }catch(err){
        console.log(err);
        req.flash('error','Error deleting comment');
        res.send("Broken Again Comment POST Route");
    }
});

router.get('/:commentId/edit',checkCommentOwner,async(req,res)=>{
    try{
        const comic = await Comic.findById(req.params.id).exec();
        const comment = await Comment.findById(req.params.commentId).exec();
        console.log(comic);
        console.log(comment);
        res.render('comments_edit',{comic,comment});
    }catch(err){
        console.log(err);
        res.send("Error comments Edit");
    }
});

// Update Route

router.put('/:commentId',checkCommentOwner,async(req,res)=>{
    try{
        const comment = await Comment.findByIdAndUpdate(req.params.commentId,{text:req.body.text},{new:true});
        console.log(comment);
        req.flash('success','Successfully updated comment');
        res.redirect(`/comics/${req.params.id}`)
    }catch(err){
        req.flash('error','Error Updating comment');
        res.redirect('/comics');
    }
});


router.delete('/:commentId' ,checkCommentOwner,async(req,res)=>{
    try{
        const comment = await Comment.findByIdAndDelete(req.params.commentId);
        console.log(comment);
        req.flash('success','Successfully deleted comment');
        res.redirect(`/comics/${req.params.id}`);
    }catch(err){
        req.flash('error','Error deleting comment');
        res.redirect('/comics');
        console.log(err);
    }
})

module.exports = router;
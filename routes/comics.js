const express = require('express');
const router = express.Router();
const Comic = require('../models/comic');
const Comment = require('../models/comment');
const isLoggedIn = require('../utils/isLoggedIn');
const checkComicOwner = require('../utils/checkComicOwner');

router.get('/',async (req,res)=>{
    try{
        const comics = await Comic.find().exec();
        console.log(comics);
        res.render('comics',{comics});
    }
    catch(err){
        console.log(err);
        res.send('You Broke it ../index');
    }
});

router.get('/new',isLoggedIn,(req,res)=>{
    res.render("comics_new")
});

router.get('/search',async(req,res)=>{
    try{
        const comics =  await Comic.find({
            $text:{
                $search:req.query.term
            }
        })
        res.render('comics',{comics});
    }catch(err){
        console.log(err);
    }
})


router.get('/genre/:genre',async(req,res)=>{
    const validGenres = ["superhero","manga","slice-of-life","humor","sci-fi","fantasy","horror","action","nonfiction"];
    if(validGenres.includes(req.params.genre.toLowerCase())){
        const comics = await Comic.find({genre:req.params.genre}).exec();
        res.render('comics',{comics});
    }else{
        res.send("Please enter a Valid Genre")
    }
});

router.post('/vote',(req,res)=>{
    res.json({message:'voted'});
});

router.get('/:id',async (req,res)=>{
   try{

        const comic = await Comic.findById(req.params.id).exec();
        const comments = await Comment.find({comicId:req.params.id});
        res.render('comics_show',{comic,comments});
    }catch(err){
        console.log(err);
        res.send("Broken Show Page")
    }
});


router.post('/',isLoggedIn, async(req,res)=>{
    const genre = req.body.genre.toLowerCase();
    const newComic = {
        title:req.body.title,
        description:req.body.description,
        author:req.body.author,
        publisher:req.body.publisher,
        date:req.body.date,
        series:req.body.series,
        issue:req.body.issue,
        genre,
        color:!!req.body.color,
        image:req.body.image,
        owner:{
            id:req.user._id,
            username:req.user.username
        },
        upvotes:[req.user.username],
        downvotes:[]
    }
    try{

        let comic = await Comic.create(newComic);
        req.flash('success','Successfully created comic');
        res.redirect(`/comics/${comic._id}`);
    }
    catch(err){
        req.flash('error','Error creating comic');
        res.render('/comics');
    }
});

router.get("/:id/edit",checkComicOwner, async (req,res)=>{
       const comic = await Comic.findById(req.params.id).exec();
       console.log(comic);
       res.render('comics_edit',{comic});
});


router.put("/:id",checkComicOwner,async (req,res)=>{
    
    const genre = req.body.genre.toLowerCase();
    const comic = {
        title:req.body.title,
        description:req.body.description,
        author:req.body.author,
        publisher:req.body.publisher,
        date:req.body.date,
        series:req.body.series,
        issue:req.body.issue,
        genre,
        color:!!req.body.color,
        image:req.body.image
    }
    
    try{
        const updatedComic = await Comic.findByIdAndUpdate(req.params.id,comic,{new:true}).exec();
        req.flash('success','Successfully Updated comic');
        res.redirect(`/comics/${req.params.id}`);
    }catch(err){
        console.log(err);
        req.flash('error','Error updating comic');
        res.redirect('/comics');
    }
});

// Delete Route

router.delete("/:id",checkComicOwner,async (req,res)=>{
    
    try{
        const comic = await Comic.findByIdAndDelete(req.params.id).exec()
        req.flash('success','comic deleted');
        res.redirect('/comics')
    }catch(err){
        req.flash('error','comic deletion failed');
        res.redirect('/comics');
    }
});



module.exports = router;
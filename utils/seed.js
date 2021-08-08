const Comic = require('../models/comic');
const Comment = require('../models/comment');

const comic_seeds = [
    {
        title:"Watchmen",
        description:"This is the description of watchmen it is a mini comic series",
        author:"Allan Moore",
        publisher:"DC",
        date:"1986-09-01",
        series:"Watchmen",
        issue:1,
        genre:"Superhero",
        color:true,
        image:"http://www.example.com/test.jpg"
    },
    {
        title:"X-Men",
        description:"This is the description of watchmen it is a mini comic series",
        author:"Allan Moore",
        publisher:"DC",
        date:"1986-09-01",
        series:"Watchmen",
        issue:1,
        genre:"Superhero",
        color:true,
        image:"http://www.example.com/test.jpg"
    },
    {
        title:"Collaboration",
        description:"This is the description of watchmen it is a mini comic series",
        author:"Allan Moore",
        publisher:"DC",
        date:"1986-09-01",
        series:"Watchmen",
        issue:1,
        genre:"Superhero",
        color:true,
        image:"http://www.example.com/test.jpg"
    },
]
const seed = async ()=>{
    await Comic.deleteMany();
    console.log("Deleted all Comics");
    await Comment.deleteMany();
    console.log("Deleted all Comments");
    // for(const comic_seed of comic_seeds){
    //     let comic = await Comic.create(comic_seed);
    //     console.log("Comics Created: ",comic.title);
    //     await Comment.create({
    //         user:"scooby_doo",
    //         text:"This is a new comment",
    //         comicId:comic._id
    //     });
    //     console.log("Comment Created");
    // }
}

module.exports = seed;
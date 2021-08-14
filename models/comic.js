const mongoose = require('mongoose');

const comicSchema = new mongoose.Schema({
    title:String,
    description:String,
    author:String,
    publisher:String,
    date:Date,
    series:String,
    issue:Number,
    genre:String,
    color:Boolean,
    image:String,
    owner:{
        id:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        },
        username:String
    },
    upvotes:[String],
    downvotes:[String]
});

comicSchema.index({
    '$**':'text'
});


const Comic = mongoose.model('comic',comicSchema);

module.exports = Comic;
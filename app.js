const express = require('express');
const app = express();
app.set('view engine','ejs');
app.use(express.static('public'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
const methodOverride = require('method-override');
const morgan = require('morgan');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const Comic = require('./models/comic');
const Comment = require('./models/comment');
const User = require('./models/user');

// const seed = require('./utils/seed');

const comicRoutes = require('./routes/comics');
const commentRoutes = require('./routes/comments');
const mainRoutes = require('./routes/main');
const userRoutes = require('./routes/auth');

const config = require('./config');
const mongoose = require('mongoose');
mongoose.connect(config.db.connection,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true});
app.use(methodOverride('_method'));
app.use(morgan('tiny'));
console.log("Testing");

// Express Session Configuartion

app.use(expressSession({
    secret:"ldjlsjdljljlsdjldjfkdjfghshlssj",
    resave:false,
    saveUninitialized:false
}))

// Passport Configuration

app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));


// Current User Middleware
app.use((req,res,next)=>{
    res.locals.user = req.user;
    next();
})


app.use("/comics",comicRoutes);
app.use("/comics/:id/comments",commentRoutes);
app.use("/",mainRoutes);
app.use("/",userRoutes);

// seed();

app.listen(3000,()=>{
    console.log("App is Running");
});
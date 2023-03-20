//jshint esversion:6
require('dotenv').config();
const express = require("express");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const session = require('express-session');
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const app = express();
const findorCreate = require("mongoose-findorcreate")


console.log(process.env.API_KEY);

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    secret: "little secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb://127.0.0.1:27017/userdb");


const userSchema = new mongoose.Schema({
    email: String,
    password : String,
    googleId:String,
    secret:String
});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findorCreate);

 const User = new mongoose.model("User", userSchema);

 passport.use(User.createStrategy());

 passport.serializeUser(function(user, cb) {
   process.nextTick(function() {
     return cb(null, {
       id: user.id,
       username: user.username,
       picture: user.picture
     });
   });
 });

 passport.deserializeUser(function(user, cb) {
   process.nextTick(function() {
     return cb(null, user);
   });
 });
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/secrets",
    userProfileURL:"https://www.googleapis.com/oauth2/v3/userinfo"
  },
  function(accessToken, refreshToken, profile, cb) {
console.log(profile);
    User.findOrCreate({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));

 app.get("/" || "/home", function(req,res){
    res.render("home");
});

app.get("/auth/google",
  passport.authenticate('google',{ scope: [ "profile"]})
);

app.get('/auth/google/secrets',
    passport.authenticate('google', {
      failureRedirect: '/Login'}),
      function(req,res){
        res.redirect("/secrets");
   });

app.get("/login", function(req,res){
    res.render("login");
});


app.get("/register", function(req,res){
    res.render("register");
});
app.get("/logout", function(req,res){
  req.logout(function(err){
    if(err){
      console.log(err);
    }
res.redirect("/");
  });

});
app.get("/secrets",function(req,res){
User.find({"secret":{ $ne:null}}, function(err,foundUsers){
  if(err){
    console.log(err);
  }else{
    if(foundUsers){
      res.render("secrets",{usersWithSecrets: foundUsers});
    }
  }
});
});

app.get("/submit",function(req,res){
  if(req.isAuthenticated()){
    res.render("submit");
  }else{
    res.redirect("/login");
  }
});
app.post("/submit", function(req,res){
  const submittedsecret = req.body.secret;
  console.log(req.user.id);

  User.findById(req.user.id, function(err,foundUser){
    if(err){
      console.log(err);
    }else{
      if(foundUser){
        foundUser.secret = submittedsecret;
        foundUser.save(function(){
          res.redirect("/secrets");
        });
      }
    }
  });
});

// posting data

app.post("/register",function(req,res){
 User.register({username : req.body.username}, req.body.password, function(err, user){
   if(err){
     console.log(err);
     res.redirect("/register");
   }else{
     passport.authenticate("local")(req,res,function(){
       res.redirect("/secrets");
     });
   }
 });

 });

app.post("/login",function(req,res){
const user = new User({
  username: req.body.username,
  password: req.body.password
});
req.login(user , function(err){
  if(err){
    console.log(err);
  }else{
    passport.authenticate("local");
  }
})
});



app.listen(3000, function() {
    console.log("server startted in port 3000.")
});

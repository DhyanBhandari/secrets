//jshint esversion:6
require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const encrypt = require("mongoose-encryption");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const app = express();

console.log(process.env.API_KEY);

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect("mongodb://127.0.0.1:27017/userdb");


const userSchema = new mongoose.Schema({
    email: String,
    password : String 
});
 

userSchema.plugin(encrypt, {secret: process.env.SECRET
    , encrypttedFields:["password"]});
 const User = new mongoose.model("User", userSchema);

app.get("/" || "/home", function(req,res){
    res.render("home");
});
app.get("/login", function(req,res){
    res.render("login");
});app.get("/register", function(req,res){
    res.render("register");
});
// posting data

app.post("/register",function(req,res){
    const newUser = new User({
        email : req.body.username,
        password:req.body.password
    });
   newUser.save(function(err){
    if(err){
        console.log(err);
    } else {
        res.render("secrets");
    }
   });
 });

app.post("/login",function(req,res){
  const  username = req.body.username;
  const  password = req.body.password;
  User.findOne({email: username},function(err, foundUser){
    if(err){
        console.log(err);
    } else {
     if(foundUser){
        if(foundUser.password === password){
            res.render("secrets");
        };
     };
    };

  });
});
   


app.listen(3000, function() {
    console.log("server startted in port 3000.")
});
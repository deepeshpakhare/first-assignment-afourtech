const mongoose = require("mongoose");
const express = require("express");
//const bodyParser = require('body-parser')
const app = express();
var cors = require('cors');
const user = require("./models/user");
app.use(cors({credentials: true, origin: true}));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post("/register", (req, res) => {
  console.log(req.body);      // your JSON
  insertUserIntoDatabase(req.body,res);
  //res.set('Content-Type', 'text/html')
  //res.send("Done");
  //res.send("Done");
});

app.post("/login", (req,res) => {
  //console.log(req.body);
  console.log("username is "+req.body.username+" and "+" password is "+req.body.password);
  loginTheUser(req.body.username,req.body.password,res);
});

const loginTheUser= async (req_username,req_password,responseObj) => {
  let userExists = await doesUserNamePasswordMatch(req_username,req_password);
  let isUser = await doesUserExistAlready(req_username);
  if(userExists) {
    responseObj.send("username password matched");
    console.log("User exists");
  }else{
    if (isUser) {
      responseObj.send("Incorrect password");
    }else{
      responseObj.send("User does not exist");
    }
    //responseObj.send("username password does not match").end();
    //console.log("User does not exists");
  }
}

const insertUserIntoDatabase = async (requestBody,responseObj) => {
    const req_username = requestBody.username;
    const req_password = requestBody.password;
    connectToDatabase();
    let userExists = await doesUserExistAlready(req_username);
        if (userExists) {
          responseObj.send("Username already exists, choose differet username");
        }else{
          insertUser(req_username,req_password);
          responseObj.send("done");
        }
      
}                                              

const connectToDatabase = () => {
  mongoose.connect("mongodb://localhost/my_database",
  {useNewUrlParser:true});
}

const doesUserExistAlready = async (req_username) => {
  const doc = await user.findOne({username:req_username});
  console.log(doc);
  if (!doc) {
    return false;
  }else{
    return true;
  }
}

const doesUserNamePasswordMatch = async (req_username,req_password) => {
  const doc = await user.findOne({username:req_username});
  //console.log(doc.username);
  //console.log(doc.password);
  if (!doc) {
    return false;
  }else{
    if(doc.password == req_password) {
      return true;
    }else{
      return false;
    }
  }
}

const insertUser = (req_username,req_password) => {
  var newUserDoc = new user();
  newUserDoc.username = req_username;
  newUserDoc.password = req_password;
  newUserDoc.save();
  console.log("user added");
}

app.get("/mypage", (req, res) => {
  res.send("hi");
  //res.redirect("/");
});
 
const PORT = 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
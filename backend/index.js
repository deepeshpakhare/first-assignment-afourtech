const mongoose = require("mongoose");
const express = require("express");
//const bodyParser = require('body-parser')
const app = express();
var cors = require('cors');
const user = require("./models/user");
app.use(cors({credentials: true, origin: true}));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

//bcrypt
const bcrypt = require('bcrypt');
const saltRounds = 10;


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
  let usernamePasswordMatch = await doesUserNamePasswordMatch(req_username,req_password);
  let isUser = await doesUserExistAlready(req_username);
  if(usernamePasswordMatch == true) {
    console.log("username password matched");
    responseObj.send("username password matched");
  }else{
    if (isUser && (usernamePasswordMatch == false)) {
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
  //var resultOfPasswordComparison = false;
  const doc = await user.findOne({username:req_username});
  //console.log(doc.username);
  //console.log(doc.password);
  if (!doc) {
    return false;
  }else{
    /*bcrypt.compare(req_password, doc.password).then(function(result) {
      console.log("bcrypt result is "+result);
      resultOfPasswordComparison = result;
    }); */
    const resultOfPasswordComparison = await bcrypt.compare(req_password, doc.password);
    if(resultOfPasswordComparison == true) {
      return true;
    }else{
      return false;
    }   
  }
}

const insertUser = (req_username,req_password) => {
  var newUserDoc = new user();
  bcrypt.hash(req_password,saltRounds).then(function(hash) {
    newUserDoc.username = req_username;
    newUserDoc.password = hash;
    newUserDoc.save();
    console.log("user added");
  }); 
}

app.get("/mypage", (req, res) => {
  res.send("hi");
  //res.redirect("/");
});
 
const PORT = 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
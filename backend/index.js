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
  //console.log(req.body);      // your JSON
  insertUserIntoDatabase(req.body);
  //res.json({'sName': req.get('name')});    // echo the result back
});

const insertUserIntoDatabase = async (requestBody) => {
    const req_username = requestBody.username;
    const req_password = requestBody.password;
    connectToDatabase();
    let userExists = await doesUserExistAlready(req_username);
    if (userExists) {
      console.log("user already there");
    }else{
      insertUser(req_username,req_password);
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

const insertUser = (req_username,req_password) => {
  var newUserDoc = new user();
  newUserDoc.username = req_username;
  newUserDoc.password = req_password;
  newUserDoc.save();
}

app.get("/mypage", (req, res) => {
  res.send("hi");
  //res.redirect("/");
});
 
app.get("/mypage", (req, res) => {
  res.send("hi");
  //res.redirect("/");

});
  
const PORT = 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
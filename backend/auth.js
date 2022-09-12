const mongoose = require("mongoose");

const user = require("./models/user");
const session = require("./models/session")
const bcrypt = require('bcrypt');
const saltRounds = 10;

const connectToDatabase = () => {
    mongoose.connect("mongodb://localhost/my_database",
    {useNewUrlParser:true});
  }

const insertUserIntoDatabase = async (user) => {
    const username = user.username;
    const password = user.password;
    connectToDatabase();
    let userExists = await doesUserExistAlready(username);
    if(userExists){
      throw "User already exists";
    }
    insertedUser = insertUser(username,password);
    return insertedUser;
} 


const loginTheUser= async (req,req_username,req_password) => {
    let usernamePasswordMatch = await doesUserNamePasswordMatch(req_username,req_password);
    //let isUser = await doesUserExistAlready(req_username);
    console.log("username passw ord match var valus is "+usernamePasswordMatch);
    if(usernamePasswordMatch == true) {
      console.log("user login successful");
      const currentUser = await getUser(req.body.username);
      const newSession = createSession(currentUser._id);
      return newSession;
    }
    if(usernamePasswordMatch == false){
      return null;    
    }
  }
  
  const createSession = async (user_id) => {
    var newSession = new session();
    newSession.user_id = user_id;
    newSession.start = new Date();
    newSession.end = null;
    newSession.isLoggedIn = true;
    await newSession.save();
    return newSession;
  }
  
  const endSession = async (session_id) => {
    var doc = await session.findOne({_id:session_id});
    doc.end = new Date();
    doc.isLoggedIn = false;
    await doc.save();
    return doc;
 }
 const isActiveSession = async (session_id) => {
    var doc = await session.findOne({_id:session_id});
    return (doc==null) ? false : doc.isLoggedIn;
 }

 const getActiveSession = async (session_id) => {
    var doc = await session.findOne({_id:session_id});
    if (doc != null) {
        if(doc.isLoggedIn) {
            return doc;
        }
    }
    return null;
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
  
  const getUser = async (req_username) => {
    const doc = await user.findOne({username:req_username});
    console.log(doc);
    if (!doc) {
      return null;
    }else{
      return doc;
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
  
  const insertUser = async (req_username,req_password) => {
      var newUserDoc = new user();
      hash = await bcrypt.hash(req_password,saltRounds);
      newUserDoc.username = req_username;
      newUserDoc.password = hash;
      await newUserDoc.save();
      return newUserDoc;
  }

  module.exports = {
    "insertUserIntoDatabase":insertUserIntoDatabase,
    "loginTheUser":loginTheUser,
    "createSession":createSession,
    "endSession":endSession,
    "doesUserExistAlready":doesUserExistAlready,
    "getUser":getUser,
    "isActiveSession":isActiveSession,
    "getActiveSession":getActiveSession

  }
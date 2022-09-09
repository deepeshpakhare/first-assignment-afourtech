const mongoose = require("mongoose");
const express = require("express");
//const bodyParser = require('body-parser')
const app = express();
var cors = require('cors');
const user = require("./models/user");
const session = require("./models/session")
app.use(cors({credentials: true, origin: true}));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//app.use(express.static(path.resolve(__dirname, '../client/build')));

//session cookie parse
const expressSession = require("express-session");
app.use(expressSession({
  secret:"secret-key-mine",
  resave:false,
  saveUninitialized:false,
}));

//bcrypt
const bcrypt = require('bcrypt');
const category = require("./models/category");
const saltRounds = 10;


app.post("/register", (req, res) => {
  console.log(req.body);      // your JSON
  try{
   var inserted =  insertUserIntoDatabase(req.body);
    res.send({
      "meta" : {
        "code":0,
        "message" :"ok"
      },
      "data": {
        "user":inserted
      }
    });
  }catch(ex){
    res.send({
      "meta" : {
        "code":1,
        "message" :ex
      }
    });
  }
  
  //res.set('Content-Type', 'text/html')
  //res.send("Done");
  //res.send("Done");
});

app.post("/login", async (req,res) => {
  //console.log(req.body);
  console.log("username is "+req.body.username+" and "+" password is "+req.body.password);
  const userSession = await loginTheUser(req,req.body.username,req.body.password);
  if (userSession != null) {
    req.session.currentSession = userSession;
    res.send({
      "meta" : {
        "code":0,
        "message" :"ok"
      },
      "data": {
        "session":userSession
      }
    });
  }else{
    res.send({
      "meta" : {
        "code":1,
        "message" :"Login failed"
      }
    })
  }
});

app.post("/logout", async (req,res) => {
  endedSession = endSession(req.session.currentSession._id);
  req.session.currentSession = null;
  res.send({
    "session" : endedSession
  });
});


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

app.post("/createCategory",async (req,res)=>{
    console.log(req.body);
    try {
      if (req.session.currentSession == null) {
          throw "Unauthorised access";
      }
      var insertedCategory = await insertCategory(req.body.category_name,req.session.currentSession.user_id);
      res.send({
      "meta" : {
        "code":0,
        "message" :"ok"
      },
      "data": {
        "category":insertedCategory
      }
      });
    } catch(ex) {
      res.send({
        "meta" : {
          "code":1,
          "message" :ex.toString()
        },
        });
    }
    
});

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

const insertCategory = async (categoryName,user_id) => {
    if (await doesCategoryExistAlready(categoryName,user_id)) {
      throw "Category already exists"
    }
    var newCategory = new category();
    newCategory.category_name = categoryName;
    newCategory.user_id = user_id;
    var createdCategory = await newCategory.save();
    if (createdCategory != null) {
      return createdCategory;
    }
    throw "Failed to create category";
}

const doesCategoryExistAlready = async (nameOfCategory,user_id) => {
    var doc = await category.findOne({category_name:nameOfCategory,user_id:user_id});
    if (doc != null) {
      return true;
    }
    return false;
}

const PORT = 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
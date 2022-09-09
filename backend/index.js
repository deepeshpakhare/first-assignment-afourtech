
const express = require("express");
const app = express();
var cors = require('cors');

app.use(cors({credentials: true, origin: true}));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const { v4: uuidv4 } = require('uuid');

//session cookie parse
const expressSession = require("express-session");
app.use(expressSession({
  genid: function(req) {
    return uuidv4() // use UUIDs for session IDs
  },
  secret:"secret-key-mine",
  resave:true,
  saveUninitialized:false,
}));

//bcrypt


//function requires
const responseData  = require("./responseData");
const {
  insertUserIntoDatabase,
  loginTheUser,
  createSession,
  endSession,
  doesUserExistAlready,
  getUser,
  isActiveSession,
  getActiveSession,
} = require("./auth")

const {insertCategory, getUserCategories} = require("./categories")

app.post("/register", (req, res) => {
  console.log(req.body);      // your JSON
  try{
   var inserted =  insertUserIntoDatabase(req.body);
    res.send(responseData.createSuccessResponseData({
        "user":inserted
      })
    );
  }catch(ex){
    res.send({
      "meta" : {
        "code":1,
        "message" :ex
      }
    });
  }
});

app.post("/login", async (req,res) => {
  //console.log(req.body);
  console.log("username is "+req.body.username+" and "+" password is "+req.body.password);
  const userSession = await loginTheUser(req,req.body.username,req.body.password);
  if (userSession != null) {
    req.session.currentSession = userSession;
    req.session.someField = "somevalue";
    // req.session.save();
    // req.session.currentSession = "ABC";
    // req.session.reload(()=>{});
    console.log("req.session",req.session);
    res.send(responseData.createSuccessResponseData({
        "session":userSession
      }
    ));
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
  endedSession = await endSession(req.session.currentSession._id);
  req.session.currentSession = null;
  res.send({
    "session" : endedSession
  });
});



app.post("/createCategory",async (req,res)=>{
    console.log(req.body);
    try {
      // if (req.session.currentSession == null) {
      //     throw "Unauthorised access";
      // }
      if (! await isActiveSession(req.body.session_id)) {
        throw "Unauthorised access";
    }
      var insertedCategory = await insertCategory(req.body.category_name,req.session.currentSession.user_id);
      res.send(responseData.createSuccessResponseData({
        "category":insertedCategory
      }
      ));
    } catch(ex) {
      res.send({
        "meta" : {
          "code":1,
          "message" :ex.toString()
        },
        });
    }
    
});

app.post("/myCategories", async (req,res) => {
  //req.session.reload(()=>{});
console.log(req.body);

  try {
    var activeSession =  await getActiveSession(req.body.session_id);
    if (activeSession == null) {
      throw "Unauthorised access";
  }
   var categories = await getUserCategories(activeSession.user_id);
   res.send(responseData.createSuccessResponseData({
    "categories":categories
  }
  ));
  } catch(ex) {
    res.send({
      "meta" : {
        "code":1,
        "message" :ex.toString()
      },
      });
  }
})



const connectToDatabase = () => {
  mongoose.connect("mongodb://localhost/my_database",
  {useNewUrlParser:true});
}




const PORT = 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
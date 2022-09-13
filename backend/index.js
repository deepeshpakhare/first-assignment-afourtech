
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

const {
  getAll,
  getbyUser,
  deleteExpense,
  updateExpense,
  insertExpense,
  getByDateRange,
}
= require("./expenses")

const {insertCategory, getUserCategories, getCategory} = require("./categories");
const { createSuccessResponseData } = require("./responseData");

app.post("/register", async (req, res) => {
  console.log(req.body);      // your JSON
  try{
   var inserted = await insertUserIntoDatabase(req.body);
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
    //req.session.someField = "somevalue";
    // req.session.save();
    // req.session.currentSession = "ABC";
    // req.session.reload(()=>{});
    console.log("req.session",req.session);
    res.send(responseData.createSuccessResponseData({
        "session":userSession,
        "username":req.body.username
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
      var activeSession =  await getActiveSession(req.body.session_id);
      if (activeSession == null) {
        throw "Unauthorised access";
    }
      var insertedCategory = await insertCategory(req.body.category_name,activeSession.user_id);
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

app.post("/addExpense",async(req,res)=>{
  try {
    var activeSession =  await getActiveSession(req.body.session_id);
    if (activeSession == null) {
      throw "Unauthorised access";
    }
    var existingCategory = await getCategory(req.body.category_id);
    if (existingCategory == null) {
      throw "no such category";
    }
    var insertedExpense = await insertExpense({
      user_id:activeSession.user_id,
      category_id:req.body.category_id,
      amount: req.body.amount,
      date_of_expense:req.body.date_of_expense,
    })
    res.send(createSuccessResponseData({
      "expense":insertedExpense
    }))
 }catch(ex) {
  res.send({
    "meta" : {
      "code":1,
      "message" :ex.toString()
    },
    });
  }
})


app.post("/myExpenses",async(req,res)=>{
  try {
    var activeSession =  await getActiveSession(req.body.session_id);
    if (activeSession == null) {
      throw "Unauthorised access";
    }
    var expenses  = await getbyUser(activeSession.user_id);
    res.send(createSuccessResponseData({
      "expenses":expenses
    }))
 }catch(ex) {
  res.send({
    "meta" : {
      "code":1,
      "message" :ex.toString()
    },
    });
  }
})

app.post("/getSummary",async(req,res)=>{
  try {
    var activeSession =  await getActiveSession(req.body.session_id);
    if (activeSession == null) {
      throw "Unauthorised access";
    }
    var expensesInTheDateRange = await getByDateRange(activeSession.user_id,req.body.start_date,req.body.end_date);
    res.send(createSuccessResponseData({
      "expensesInDateRange" : expensesInTheDateRange
    }))
  }catch(ex){
    res.send({
      "meta" : {
        "code":1,
        "message" :ex.toString()
      },
      });
  }
})







const PORT = 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
const express = require("express");
//const bodyParser = require('body-parser')
const app = express();
var cors = require('cors')
app.use(cors({credentials: true, origin: true}));
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


app.post("/register", (req, res) => {
  console.log(req.body);      // your JSON
  res.json({'sName': req.get('name')});    // echo the result back
});
app.get("/mypage", (req, res) => {
  res.send("hi");
  //res.redirect("/");
});
  
const PORT = 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));
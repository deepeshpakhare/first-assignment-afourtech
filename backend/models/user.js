const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my_database",{useNewUrlParser:true});
const Schema = mongoose.Schema;
const userSchema = new Schema({
    username:String,
    password:String
});
const user = mongoose.model("user",userSchema);
module.exports = user;


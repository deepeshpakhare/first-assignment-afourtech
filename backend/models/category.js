const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my_database",{useNewUrlParser:true});
const Schema = mongoose.Schema;
const categorySchema = new Schema({
    category_name:String,
    user_id:{type: Schema.Types.ObjectId, ref:"users"}
});
const category = mongoose.model("category",categorySchema);
module.exports = category;
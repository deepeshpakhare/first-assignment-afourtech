const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my_database",{useNewUrlParser:true});
const Schema = mongoose.Schema;
const budgetSchema = new Schema({
    user_id:{type: Schema.Types.ObjectId, ref:"users"},
    category_id:{type: Schema.Types.ObjectId, ref:"categories"},
    amount:Number,
});
const budget= mongoose.model("budget",budgetSchema);
module.exports = budget;
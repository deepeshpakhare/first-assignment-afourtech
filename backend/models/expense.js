const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my_database",{useNewUrlParser:true});
const Schema = mongoose.Schema;
const expenseSchema = new Schema({
    user_id:{type: Schema.Types.ObjectId, ref:"users"},
    category_id:{type: Schema.Types.ObjectId, ref:"categories"},
    amount:Number,
    date_of_expense:Date,
});
const expense = mongoose.model("expense",expenseSchema);
module.exports = expense;


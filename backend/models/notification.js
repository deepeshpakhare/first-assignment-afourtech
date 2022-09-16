const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my_database",{useNewUrlParser:true});
const Schema = mongoose.Schema;
const notificationSchema = new Schema({
    user_id:{type: Schema.Types.ObjectId, ref:"users"},
    category_id:{type: Schema.Types.ObjectId, ref:"categories"},
    budget_id:{type: Schema.Types.ObjectId, ref:"budgets"},
});
const notification = mongoose.model("notification",expenseSchema);
module.exports = notification;

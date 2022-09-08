const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/my_database",{useNewUrlParser:true});
const Schema = mongoose.Schema;
const sessionSchema = new Schema(
    {   user_id: {type: Schema.Types.ObjectId, ref:"users"},
        start: Date,
        end: Date,
        isLoggedIn: Boolean,
    }, {timestamps:true});
const session = mongoose.model("session",sessionSchema);
module.exports = session;
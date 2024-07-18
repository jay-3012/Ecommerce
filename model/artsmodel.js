import mongoose from "mongoose";

const artSchema = mongoose.Schema({
    name:String,
    Price:Number,
    Category:String,
    image:String,
    title:String
});

const Art =  mongoose.model("Art",artSchema);
export default Art;
// module.exports = mongoose.model("Users", userSchema);
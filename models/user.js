const mongodb = require("mongoose");

const userSchema = new mongodb.Schema({
firstName: {
    type: String,
    required: true,
    min: 6,
    max: 20,
  },
  lastName: {
    type: String,
    required: true,
    min: 6,
    max: 20,
  },
  email: {
    type: String,
    required: true,
    min: 10,
    max: 30,
    unique: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    min: 13,
    max: 13,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    min: 6,
    max: 20,
  },
  profileIMG:{type:String,required:true},
  isAdmin:{type:Boolean,default:false},
  followers: [{ userId: { type: mongodb.Schema.Types.ObjectId, ref: "User" } }],
  following: [{ userId: { type: mongodb.Schema.Types.ObjectId, ref: "user" } }],
},{timestamps:true});

module.exports = mongodb.model("User", userSchema);

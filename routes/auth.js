const router = require("express").Router();
const user = require("../models/user");
const jwt = require('jsonwebtoken');
const cryptoJS = require("crypto-js");
require("dotenv").config();

router.post("/register", async (req, res) => {
  const newUser = new user({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    profileIMG:req.body.profileIMG,
    password: cryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASSENC
    ).toString(),
  });
  try {
    const savedUser = await newUser.save();
    const { password, ...others } = savedUser._doc;

    res.status(200).json({ others });
  } catch (error) {
    res.status(500).json(error);
  }
});

//login
router.post("/login", async (req, res) => {
  try {
    const User = await user.findOne({
      $or: [{ email: req.body.email }, { phoneNumber: req.body.phoneNumber }]
    });
    if (!User) {
      return res.status(400).json("email not found");
    }
    const orignalPssword = cryptoJS.AES.decrypt(
      User.password,
      process.env.PASSENC
    ).toString(cryptoJS.enc.Utf8);

    if (orignalPssword !== req.body.password) {
      return res.status(403).json("user not found");
    }
    const {password,...others} = User._doc
    //generate accesstoken
    const accessToken = jwt.sign({id:User._id,isAdmin:User.isAdmin},process.env.jwtSEC,{expiresIn:"1d"})
 
    res.status(200).json({...others,accessToken})

  } catch (error) {
    res.status(500).json(error);
  }
});



module.exports = router;

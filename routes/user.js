const router = require("express").Router();
const user = require("../models/user");
const {
  virifyToken,
  virifyTokenAndAuth,
  virifyTokenAndAuthAdmin,
} = require("./verifyToken");
const cryptoJS = require("crypto-js");

//deleting user
router.delete("/delete/:id", virifyTokenAndAuth, async (req, res) => {
  try {
    await user.findByIdAndDelete(req.params.id);
    res.status(200).json("data deleted");
  } catch (error) {
    res.status(501).json(error);
  }
});

//updating user
router.put("/update/:id", virifyTokenAndAuth, async (req, res) => {
  if (req.body.password) {
    req.body.password = cryptoJS.AES.enc(
      req.body.password,
      process.env.PASSENC
    ).toString();
  }

  try {
    const updateUser = await user.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get one user
router.get("/find/:id", async (req, res) => {
  try {
    const singleUser = await user.findOne({ _id: req.params.id });
    res.status(200).json(singleUser);
  } catch (error) {
    res.status(401).json(error);
  }
});

//get all user
router.get("/find", virifyTokenAndAuthAdmin, async (req, res) => {
  try {
    const allUsers = await user.find();
    res.status(200).json(allUsers);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

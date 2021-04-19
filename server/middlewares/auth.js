const admin = require("../firebase");
<<<<<<< HEAD
const User = require("../models/user");

exports.authCheck = async (req, res, next) => {
  try {
    const firebaseUser = await admin
      .auth()
      .verifyIdToken(req.headers.authtoken); //whatever token we will recieve from front end headers
    req.user = firebaseUser;
    next();
  } catch (err) {
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};

exports.adminCheck = async (req, res, next) => {
  const { email } = req.user;
  const adminUser = await User.findOne({ email: email }).exec();

  if (adminUser.role !== "admin") {
    res.status(403).json({
      err: "Aceess Denied",
    });
  } else {
    next();
  }
=======

exports.authCheck = (req, res, next) => {
  console.log(req.headers); //token
  next();
>>>>>>> 229820b0c031893b8f44ffb866a618a853e90c64
};

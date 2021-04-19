<<<<<<< HEAD
const User = require("../models/user");

exports.createOrUpdateUserController = async (req, res) => {
  const { name, picture, email } = req.user;

  //*first argument will find user by--->>email
  //**second argument-->what u wanna update
  //***third argument is optional which will give us only updated
  //info otherwise we can get old info as well
  const existedUser = await User.findOneAndUpdate(
    { email: email },
    { name: email.split("@")[0], picture },
    { new: true }
  );
  if (existedUser) {
    console.log("User Updated-----------------------", existedUser);
    res.json(existedUser);
  } else {
    const newUser = await new User({
      email,
      name: email.split("@")[0],
      picture,
    }).save();
    console.log("User Created-----------------------", newUser);
    res.json(newUser);
  }
};

exports.currentUserController = async (req, res) => {
  User.findOne({ email: req.user.email }).exec((err, user) => {
    if (err) throw new Error(err);
    res.json(user);
=======
exports.createOrUpdateUserController = (req, res) => {
  res.json({
    data: "hi you hit create or update user API endpoint",
>>>>>>> 229820b0c031893b8f44ffb866a618a853e90c64
  });
};

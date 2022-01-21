const bcrypt = require("bcryptjs");

const User = require("../model/user-model");
const validateRegisterInput = require("../helpers/validateRegisterInput");
const validateLoginInput = require("../helpers/validateLoginInput");
const generateToken = require("../helpers/generateToken");

register = async (req, res) => {
  const { valid, errors } = await validateRegisterInput(req.body);
  if (!valid) {
    return res.status(400).json({
      success: false,
      errors: errors,
    });
  }

  req.body.password = await bcrypt.hash(req.body.password, 12);

  const newUser = new User(req.body);
  const result = await newUser.save();
  const token = generateToken(result);
  return res.status(201).json({
    success: true,
    message: "Account Created Successfully",
    ...result._doc,
    id: result._id,
    token,
  });
};

login = async (req, res) => {
  const { errors, valid } = await validateLoginInput(req.body);
  if (!valid) {
    return res.status(401).json({
      success: false,
      errors: errors,
    });
  }

  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    return res.status(401).json({
      success: false,
      errors: "User Doesn't Exists",
    });
  }

  const match = await bcrypt.compare(req.body.password, user.password);

  if (!match) {
    return res.status(203).json({
      success: false,
      errors: "Invalid Password",
    });
  }
  const token = generateToken(user);

  return res.status(201).json({
    success: true,
    message: "Logged In Successful",
    ...user._doc,
    id: user._id,
    token,
  });
};

module.exports = { register, login };

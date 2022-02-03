const User = require("../db/models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_SECRET, JWT_EXPIRATION_MS } = require("../config/key");
exports.signUp = async (req, res, next) => {
  try {
    //STEP ONE: encrypt the password
    const saltRound = 10;
    const hashedPassword = await bcrypt.hash(req.body.password, saltRound);
    req.body.password = hashedPassword;
    //STEP TWO: send the hash password
    const user = await User.create(req.body);

    //STEP THREE:the data that I want to send to the user in the inside Token and create it
    const payload = {
      username: user.username,
      id: user.id,
      exp: Date.now() + JWT_EXPIRATION_MS,
      name: `${user.firstName} ${user.lastName}`,
    };
    const token = jwt.sign(payload, JWT_SECRET);

    //STEP FOUR: Show the Token
    res.status(201).json({ token: token });
  } catch (err) {
    next(err);
  }
};

exports.signIn = async (req, res, next) => {};

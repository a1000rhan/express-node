const LocalStrategy = require("passport-local").Strategy;
const User = require("../db/models/User");
const bcrypt = require("bcrypt");

exports.localStrategy = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await User.findOne({ username: username });
    const checkPassword = user
      ? await bcrypt.compare(password, user.password)
      : false;
    checkPassword ? done(null, user) : done(null, false);

    /*if (user) {
      //check pass
      const checkPassword = await bcrypt.compare(password, user.password);
      if(checkPassword){
          done(null,user)
      }
      else{
          done(null,false)
      }
    } else {
      //if username is not exist throw error 401 unauthorized
      done(null, false);
    }
    */
  } catch (err) {
    done(err);
  }
});

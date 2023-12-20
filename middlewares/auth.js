const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const { jwtSecretKey } = require("../config");

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecretKey,
};

const initializePassport = (passport) => {
  passport.use(
    new JwtStrategy(jwtOptions, (payload, done) => {
      return done(null, payload);
    })
  );
};

module.exports = {
  initializePassport,
};

const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: '1095537354823-52j5sogbp3gs0odm4fafu5lncq8dsm78.apps.googleusercontent.com',
  clientSecret: 'VepOmfAl_U6skYlif14bdgwZ',
  callbackURL: "http://localhost:4000/auth/google/callback"
},
function(accessToken, refreshToken, user, done){
  return done(null, user)
}))
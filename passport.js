const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const APIEndpoint = "http://localhost:5500/api";
const fetch = require("node-fetch");
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(new GoogleStrategy({
  clientID: '1095537354823-52j5sogbp3gs0odm4fafu5lncq8dsm78.apps.googleusercontent.com',
  clientSecret: 'VepOmfAl_U6skYlif14bdgwZ',
  callbackURL: "http://localhost:4000/auth/google/callback" //needs to change when on heroku
},
async function(accessToken, refreshToken, user, done){

  const response = await (await fetch(`${APIEndpoint}/users/find/${user.emails[0].value}`)).json()
  console.log(response)
  if(response === null){
    data = {
      email_address: user.emails[0].value,
      first_name: user.name.givenName,
      last_name: user.name.familyName
    }
    fetch(`${APIEndpoint}/users/`, {
      headers: {
          "content-type": "application/json; charset=UTF-8"
      },
      method: "POST", 
      body: JSON.stringify(data)
    }).then(res => {
      console.log("Request complete! response:", res);
    });
  }
  done(null, user)

  
}))

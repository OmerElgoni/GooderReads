const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const app = express();
const cookieSession = require('cookie-session')
const passport = require('passport')
const path = require('path');
const errorHandler = require('errorhandler')
require('./passport')

app.use(express.static("public"));
app.use(express.static("public/pages"));

app.use(cookieSession({
  name: 'session-name',
  keys: ['key1', 'key2']
}))

app.use(passport.initialize())
app.use(passport.session())

const checkUserLoggedIn = (req, res, next) => {
  req.user ? next() : res.redirect('/auth/google')
}

app.get('search', (req,res) =>{
  res.send('please')
})

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'], prompt: "select_account"}))

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/failed'}),
  function(req, res) {
    res.redirect('/profile')
  }
)

app.get('/profile', checkUserLoggedIn,(req,res) =>{
  res.sendFile(path.join(__dirname + '/private_pages/profile.html'))
})

app.get('/readlist', checkUserLoggedIn,(req,res) =>{
    res.sendFile(path.join(__dirname + '/private_pages/readlist.html'))
})

app.get('/wishlist', checkUserLoggedIn,(req,res) =>{
    res.sendFile(path.join(__dirname + '/private_pages/wishlist.html'))
})

app.get('/logout', (req, res) => {
  req.session = null
  req.logout()
  res.redirect('/browse')
})


app.use(errorHandler({ log: errorNotification }));

function errorNotification(err, str, req) {
  console.log('ERROR', err);
}

app.use('/failed', (req, res) =>{
  res.send('I failed')
})

app.use('/logout', (req, res) => {
  req.session = null
  req.logout()
  res.redirect('/')
})
app.use(express.static("public"));
app.use(express.static("public/pages"));

//Used for logging
app.use(morgan("common"));
//Used for security
app.use(helmet());
//Implements cors
app.use(cors());

app.get("*", async(req, res) => {
    try {
        res.sendFile(path.join(__dirname + "/public/pages" + req.originalUrl));
    } catch (err) {
        res.status(500).send(err);
    }
});

//start app
const port = process.env.PORT || 4000;

app.listen(port, () => console.log(`App is listening on port ${port}.`));
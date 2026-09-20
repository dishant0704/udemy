const fs = require('fs');
const path = require('path');
const https = require('https');
const express = require('express');
const helmet = require('helmet');
const passport = require('passport')
const {Strategy} = require('passport-google-oauth20');
const cookieSession = require('cookie-session')

require('dotenv').config();

const requiredEnv = [
  'CLIENT_ID',
  'CLIENT_SECRET',
  'COOKIE_KEY_1',
  'COOKIE_KEY_2',
];

for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing environment variable: ${key}`);
  }
}

const app = express();

const PORT = 3000;

const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  COOKIE_KEY_1: process.env.COOKIE_KEY_1,
  COOKIE_KEY_2: process.env.COOKIE_KEY_2,
};

const AUTH_OPTIONS = {
  callbackURL: 'https://localhost:3000/auth/google/callback',
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
};

if (
  typeof AUTH_OPTIONS.clientID !== 'string' ||
  !AUTH_OPTIONS.clientID.trim()
) {
  throw new Error('Google CLIENT_ID is missing');
}

if (
  typeof AUTH_OPTIONS.clientSecret !== 'string' ||
  !AUTH_OPTIONS.clientSecret.trim() ||
  AUTH_OPTIONS.clientSecret === 'undefined'
) {
  throw new Error('Google CLIENT_SECRET is invalid');
}

passport.use(
  new Strategy(AUTH_OPTIONS, verifyCallback)
);
function verifyCallback(accessToken, refreshToken, profile, done) {
  // console.log('Google profile', profile);
  done(null, profile);
}

passport.serializeUser((user, done) => { 
  done(null, user.id);
});

passport.deserializeUser((id, done) => { 
  done(null, { id });
});

app.use(helmet());

app.use(cookieSession({
  name: 'session',
  maxAge: 24 * 60 * 60 * 1000,
  keys: [
    config.COOKIE_KEY_1,
    config.COOKIE_KEY_2,
  ],
  httpOnly: true,
  secure: true,
  sameSite: 'lax',
}));

// 🔥 FIX: Middleware to patch cookie-session for Passport 0.6+ compatibility
app.use((req, res, next) => {
  // Stub out missing regenerate and save functions.
  // These don't make sense for client side sessions.
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb) => { cb(); };
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb) => { cb(); };
  }
  next();
});

app.use(passport.initialize());
app.use(passport.session());

function checLookedIn(req, res, next){  
  if(!req.isAuthenticated()){
    return res.status(401).json({
      error: 'Your must login!'
    })
  }
  next();
}

passport.use(new Strategy(AUTH_OPTIONS, verifyCallback))

app.get('/auth/google',
  passport.authenticate('google', {
    scope: ['email'],
  }));

app.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/failure',
    successRedirect: '/',
    session: true,
  }),
  (req, res) => {
    console.log('Google called us back!');
  }
);

app.get('/auth/logout',(req, res)=>{
  //Remove the req.user and clear any log in session
  req.logout(function(err) {
    if (err) { 
      return next(err); 
    }
    res.redirect('/');
  });
})

app.get('/failure', (req, res) => {
  return res.send('Failed to log in!');
});

// FIX: Updated to use the corrected middleware name
app.get('/secret', checLookedIn, (req, res) => {
  return res.send('Your personal secret value is 42!');
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

https.createServer({
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem'),
}, app).listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

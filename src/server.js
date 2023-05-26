const session = require('express-session');
const express = require('express');
const { postRouter, userRouter } = require('./routes/');
const cookieParser = require('cookie-parser');
const crypto = require('crypto');

const app = express();

// Generate a random session secret
const generateSessionSecret = () => {
  return crypto.randomBytes(32).toString('hex');
};

// Set the session secret
const SESSION_SECRET = process.env.SESSION_SECRET || generateSessionSecret();

app.use(cookieParser());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
    },
  })
);

app.use(express.json());
app.use('/', postRouter, userRouter);

app.listen(5001, async () => {
  console.log('Listening on port 5001');
});

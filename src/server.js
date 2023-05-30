const session = require('express-session');
const express = require('express');
const { postRouter, userRouter } = require('./routes/');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();

app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'Super Secret (change it)',
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
    },
  })
);

app.use(cors({
  origin: 'https://gh-pages--testhostserversocial.netlify.app',
  credentials: true,
}));

app.use(express.json());
app.use('/', postRouter, userRouter);

app.listen(5001, async () => {
  console.log('Listening on port 5001');
});

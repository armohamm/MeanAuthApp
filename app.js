const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');
const cookieParser = require('cookie-parser')

//fb passport
// Connect To Database
mongoose.connect(config.database);

// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

const users = require('./routes/users');
const rt_mail = require('./routes/mail');
const rt_mail1 = require('./routes/mail1');
// Port Number
const port = 3000;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
//fb_login==============================
// app.use(express.cookieParser());
app.use(cookieParser());
require('./config/passport_fb')(passport);
//gogl_login==============================
require('./config/passport_gogl')(passport);
//Linkedin_login==============================
require('./config/passport_linkedin')(passport);
// app.get('/login/facebook',
//   passport.authenticate('facebook'));
//==================


app.use('/users', users);
app.use('/users', rt_mail);
app.use('/mail_temp', rt_mail1);
// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('node:path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('passport');
const passportConfig = require('./config/passport');

const authRoutes = require('./routes/auth.routes');
const adsRoutes = require('./routes/ads.routes');

const app = express();

mongoose.connect('mongodb://0.0.0.0:27017/YachtTrade');
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', err => console.log('Error ' + err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ 
  secret: process.env.secret,
  cookie: {
    secure: process.env.NODE_ENV == 'production',
  },
  store: MongoStore.create({
    mongoUrl: 'mongodb://0.0.0.0:27017/YachtTrade',
    collectionName: 'sessions',
  }),
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '../frontend/build')));

app.use('/api/auth', authRoutes);
app.use('/api', adsRoutes);

app.use('/', (req, res) => {
  res.status(404).send('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
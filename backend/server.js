const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('node:path');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const authRoutes = require('./routes/auth.routes');

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
  secret: 'xyz567',
  store: MongoStore.create({
    mongoUrl: 'mongodb://0.0.0.0:27017/YachtTrade',
    collectionName: 'sessions',
  }),
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(path.join(__dirname, '/public')));

app.use('/api/auth', authRoutes);

app.use('/', (req, res) => {
  res.status(404).render('notFound');
});

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});
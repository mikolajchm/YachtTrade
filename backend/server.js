const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('node:path');

const authRoutes = require('./routes/auth.routes');

const app = express();

app.listen('8000', () => {
  console.log('Server is running on port: 8000');
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

mongoose.connect('mongodb://0.0.0.0:27017/YachtTrade');
const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to the database');
});

db.on('error', err => console.log('Error ' + err));

app.use('/api/auth', authRoutes);

app.use('/', (req, res) => {
  res.status(404).render('notFound');
});
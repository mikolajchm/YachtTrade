const User = require('../models/user.model');
const Session = require('../models/session.model');
const bcrypt = require('bcryptjs');


exports.register = async (req, res) => {
  try {
    const { firstName, lastName, login, password } = req.body;
    if (
      firstName && typeof firstName === 'string' &&
      lastName && typeof lastName === 'string' &&
      login && typeof login === 'string' && 
      password && typeof password === 'string'
    ) {
      
      const userWithLogin = await User.findOne({ login });

      if (userWithLogin)  {
        return res.status(409).send({ message: 'User with this login already exist' });
      }

      const user = await User.create({ firstName, lastName, login, password: await bcrypt.hash(password, 12) });
      res.status(201).send({ message: 'User created ' + user.login })
    } else {
      res.status(400).send({ message: 'Bad request' });
    }

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}


exports.login = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (login && typeof login === 'string' && password && typeof password === 'string') {

      const user = await User.findOne({ login });

      if (!user) {
        return res.status(400).send({ message: 'Login or password is incorrect' });
      } else {
        if (bcrypt.compareSync(password, user.password)) {
          req.session.user = user;
          res.status(200).send({ message: 'Login succesfull' });
        } else {
          res.status(400).send({ message: 'Login or password is incorrect' });
        }
      }

    } else {
      res.status(400).send({ message: 'Bad request' });
    }

  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}


exports.user = async (req, res) => {
  if (req.session.user) {
    res.send(req.session.user);
    res.status(200);
  } 
  res.send(500);
}


exports.logout = async (req, res) => {
  try {
    req.session.destroy(async (err) => {
      if (err) {
        return res.status(500).send({ message: err.message });
      }
      if (process.env.NODE_ENV !== "production") {
        try {
          await Session.deleteMany({});
        } catch (err) {
          return res.status(500).send({ message: err.message });
        }
      }

      res.json({ message: 'Logout successful' });
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
}
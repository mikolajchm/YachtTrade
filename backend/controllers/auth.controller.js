const User = require('../models/user.model');
const bcrypt = require('bcryptjs');


exports.register = async (req, res) => {
  try {
    const { login, password } = req.body;
    if (login && typeof login === 'string' && password && typeof password === 'string') {
      
      const userWithLogin = await User.findOne({ login });

      if (userWithLogin)  {
        return res.status(409).send({ message: 'User with this login already exist' });
      }

      const user = await User.create({ login, password: await bcrypt.hash(password, 12) });
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
  res.send( req.session.user );
}
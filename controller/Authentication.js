
const passport = require('passport');
const jwt = require('jsonwebtoken');
const {secret} = require('../config/secret');

const tokenForUser = (user) => {
    const payload = {id: user._id, username: user.username};
    const token = jwt.sign(payload, secret);
    return 'Bearer ' + token;
}

exports.signup = (req, res, next) => {
    passport.authenticate('local-signup', (err, user) => {

        res.json({message: 'success', token: tokenForUser(user), user})

    })(req, res, next)
}

exports.login = (req, res) => {
   res.send({message:'login successfully', token: tokenForUser(req.user)})
}
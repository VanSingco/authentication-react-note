
const jwt = require('jsonwebtoken');
const {secret} = require('../config/secret');
const User = require('../models/user');

const tokenForUser = (user) => {
    const payload = {id: user._id, username: user.usernamse};
    const token = jwt.sign(payload, secret);
    return 'Bearer ' + token;
}

exports.signup = (req, res, next) => {
     User.findOne({email: req.body.email}).then((user) => {
        
        if (user) return res.status(442).send({error: 'Email is already taken'});

        User.findOne({username: req.body.username}).then((user) => {

            if(user) return res.status(442).send({error: 'Username is already taken'});

            const newUser = new User();
            newUser.username = req.body.username;
            newUser.fullname = req.body.fullname;
            newUser.email = req.body.email;
            newUser.photo = newUser.gravatar(200);
            newUser.password = req.body.password;
            newUser.save((err) => {
                if(err) return next(err)
                 res.json({ token: tokenForUser(newUser), user: newUser});
            });

        }).catch((err) => next(err));
    }).catch((err) => next(err));
}

exports.signin = (req, res) => {
    res.send({token: tokenForUser(req.user), user: req.user});
}

exports.signout = (req, res) => {
    req.logout();
    res.redirect('/');
}
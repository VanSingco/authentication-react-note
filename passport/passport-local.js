const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const passportJWT = require("passport-jwt");
const ExtractJWT = passportJWT.ExtractJwt;
const JWTStrategy = passportJWT.Strategy;
const User = require('../models/user');
const {secret} = require('../config/secret');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user)
    })
});
// passport-local signup
passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) => {
    User.findOne({email: req.body.email}).then((user) => {
        
        if (user) return done(null, false);

        User.findOne({username: req.body.username}).then((user) => {

            if(user) return done(null, false);

            const newUser = new User();
            newUser.username = req.body.username;
            newUser.fullname = req.body.fullname;
            newUser.email = req.body.email;
            newUser.photo = newUser.gravatar(200);
            newUser.password = req.body.password;
            newUser.save((err) => {
                return done(null, newUser);
            });

        }).catch((err) => done(err));
    }).catch((err) => done(err));
}));
// passport local-login
passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, (req, email, password, done) =>{
    User.findOne({email}).then((user) => {

        if (!user) return done(null, false);

        if(!user.comparePassword(password)) return done(null, false);

        return done(null, user);

    }).catch((err) => done(err));
}));

// passport jsonwebtoken
const opts = {};
opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = secret;

passport.use(new JWTStrategy(opts, (jwtPayload, done) => {
    //find the user in db if needed
    return User.findById(jwtPayload.id)
        .then(user => {
            if (user) {
                done(null, user)
            }
        })
        .catch(err => done(err));
}));


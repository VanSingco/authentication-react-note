const Authentication = require('../controller/Authentication');

module.exports = (app, passport) => {
    
    const requireAuth = passport.authenticate('jwt', {session: false});
    const requireSignIn =  passport.authenticate('local-login', {session: false});

    app.get('/', requireAuth, (req, res) => {
        res.send('Im Home')
    });

    app.post('/signup', Authentication.signup);

    app.post('/login', requireSignIn, Authentication.login);
    
}
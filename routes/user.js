const Authentication = require('../controller/Authentication');

module.exports = (app, passport) => {
    
    const requireAuth = passport.authenticate('jwt', {session: false});
    const requireSignIn =  passport.authenticate('local-login', {session: false});


    app.post('/auth/signup', Authentication.signup);
    app.post('/auth/signin', requireSignIn, Authentication.signin);
    app.get('/api/signout', Authentication.signout);

    app.get('/api/current_user', requireAuth, (req, res) => {
        res.send(req.user)
    });
    
}
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const {database} = require('./config/secret')


const app = express();
const http = require('http').Server(app)

mongoose.connect(database, {useNewUrlParser: true}, (err) => {
    if (err) console.log(err)
    console.log('Successfully connected to database')
})

require('./passport/passport-local')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(passport.initialize());
app.use(passport.session())

require('./routes/user')(app, passport);

const PORT = process.env.PORT || 5000
http.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`)
})





















































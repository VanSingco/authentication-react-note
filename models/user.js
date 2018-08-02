const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const Schema = mongoose.Schema;

const UserSchema= new Schema({
    username: {type: String, trim: true, unique: true, lowercase: true, required: true},
    fullname: {type: String, trim: true, default: ''},
    email:  {type: String, trim: true, unique: true, lowercase: true, required: true},
    password: {type:String},
    photo: {type:String},
    facebook: {type:String, default: ''},
    fbTokens: Array,
    google:{type:String, default: ''},
});

UserSchema.pre('save', function(next){
    const user = this;
    if (user.isModified('password')) {
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(user.password, salt, (err, hash) => {
                user.password = hash;
                next();
            })
        });
    } else {
        next();
    }
});

UserSchema.methods.gravatar = function (size) {
    if (!size) size = 200;
    if (!this.email) return `https://gravatar.com/avatar/?s=${size}&d=retro`;
    var md5 = crypto.createHash('md5').update(this.email).digest('hex');
    return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

UserSchema.methods.comparePassword = function(password){
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('User', UserSchema);
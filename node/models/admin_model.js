var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var adminSchema = new Schema({
    email : {type:String, required:[true,'Email id is required']},
    username: {type:String, required:[true,'Username is required']},
    password:{type:String, required:[true,'Password is required']},
    creation_dt:{type:Date}
});

adminSchema.statics.hashPassword = function hashPassword(password){
    return bcrypt.hashSync(password,10);
}

adminSchema.methods.isValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}

module.exports = mongoose.model('Admin',adminSchema);
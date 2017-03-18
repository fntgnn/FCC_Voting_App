const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');

const Schema = mongoose.Schema;

//Define our model
const userSchema = new Schema({ //lowercase per trasformarlo in lowercase
    name: {type: String},
    email: {type: String, unique: true, lowercase: true},
    password: String
});

//onSave Hook, encrypt password
userSchema.pre('save', function(next){
    const user = this;
    //genera il sale e poi esegue callback
    bcrypt.genSalt(10, function(err, salt){
        if(err)
            return next(err);
        //encripta la passwrod usando il sale
        bcrypt.hash(user.password, salt, null, function(err, hash){
            if(err)
                return next(err);
            //sostituisce la password con l'hash
            user.password = hash;
            next();
        })
    })
});


userSchema.methods.comparePassword = function(candidatePassword, callback){
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
        if (err) { return callback(err); }

        callback(null, isMatch);
    })
}

//Create the model class
const ModelClass = mongoose.model('user',userSchema);


//Export the model
module.exports = ModelClass;

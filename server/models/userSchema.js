const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcryptjs")


// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    createddate : { type : Date, default: Date.now }
});

userSchema.pre("save",async function (next){
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password,salt)
    this.password = hash;
    next()
})

//Export the model
module.exports = mongoose.model('User', userSchema);
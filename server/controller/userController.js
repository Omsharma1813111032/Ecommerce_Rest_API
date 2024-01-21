const User = require("../models/userSchema")

exports.register = async(req,res) =>{
    
    const email = req.body.email;

    const findUser = await User.findOne({email:email})


    if(!findUser){
        // const newUser = await User.create(req.body)
        const newUser = new User(req.body)
        
        const response = await newUser.save()
        
        console.log(response)
        res.status(200).json({msg:"Successfully Registered!!",data:newUser})
    }else{
        res.status(401).json({error:"User Exists Already!!"})
    }


}
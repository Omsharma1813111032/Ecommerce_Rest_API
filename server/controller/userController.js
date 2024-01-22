const User = require("../models/userSchema")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
// regitser function
exports.register = async(req,res) =>{
    const email = req.body.email;
    const findUser = await User.findOne({email:email})

    if(!findUser){
        const newUser = new User(req.body)
        const response = await newUser.save()
        console.log(response)
        res.status(200).json({msg:"Successfully Registered!!",data:newUser})
    }else{
        res.status(401).json({error:"User Exists Already!!"})
    }
}

exports.login = async(req,res) =>{
    const {email,password} = req.body

    try{

        const userExists = await User.findOne({email:email})
        if(userExists){
            // console.log(userExists.password)
            const comparePassword = await bcrypt.compare(password,userExists.password)
            // console.log(comparePassword)
            if(comparePassword===true){

                const token = jwt.sign({
                    email,password
                },process.env.SECRET_KEY)


                res.status(200).json({tok:token,data:userExists})



            }else{
                res.status(400).json({error:"Wrong Credentails!!"})
            }
        }else{
            res.status(400).json({error:"User Does Not Exists!!"})
        }


    }catch(err){
        res.status(400).json({error:err})
    }

}
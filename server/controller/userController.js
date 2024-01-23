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


// for user login
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


//fetching all  user

exports.getAllUser = async(req,res) =>{
    try{
        const data  = await User.find()
        res.json(data)
    }catch(err){
        res.status(400).json({err})
    }
}



// fetching a single user bby id

exports.getUser = async(req,res) =>{
    const id = req.params.id
    try{
        const data  = await User.find({_id:id})
        res.json(data)
    }catch(err){
        res.status(400).json({err})
    }
}


// deleting a user
exports.deleteUser = async(req,res) =>{
    const id = req.params.id
    try{
        const data  = await User.findByIdAndDelete({_id:id})
        res.status(200).json(data)
    }catch(err){
        res.status(400).json({err})
    }
}


exports.updateUser = async(req,res) =>{
    const {id} = req.params
    const {firstname,lastname,email,mobile} = req.body
    try{    

        const data = await User.findByIdAndUpdate(id,{
            firstname:firstname,
            lastname:lastname,
            email:email,
            mobile:mobile,
        })     
        
        res.status(200).json({"msg":"updated",data:data})     

    }catch(err){
        res.status(400).json({err})
    }
    
}
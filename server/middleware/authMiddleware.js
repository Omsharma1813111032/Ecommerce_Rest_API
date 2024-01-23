const jwt = require("jsonwebtoken")
const userSchema = require("../models/userSchema")


exports.authMiddleware = async(req,res,next) =>{

    try{
        const token = req.headers.authorization
        if(token){
            const verifyUser = jwt.verify(token,process.env.SECRET_KEY)
            // console.log(verifyUser)
            const user = await userSchema.find({email:verifyUser.email})
            req.user = user
            // console.log(user)
            next()
        }else{
            res.status(400).json({error:"Something went wrong!!"})
        }
    }catch(err){
        res.status(400).json({error:err})
    }
}

exports.isAdmin = async(req,res,next) =>{
    try{    

        if(req.user){

            const {isAdmin} = req.user[0]
            // console.log(req.user[0].isAdmin)

            if(isAdmin==='admin'){
                next()
                // res.status(200).json({msg:"Yes you are admin "})
            }else{
                res.status(400).json({msg:"You don't have access!!"})
            }
            

        }else{
            res.status(400).json({err:"Something went wrong!!"})
        }

    }catch(err){
        res.status(400).json(err)
    }
}
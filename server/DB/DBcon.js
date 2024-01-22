const mongoose  = require("mongoose")


const getCon = async(req,res) =>{ 
    const response = await mongoose.connect(process.env.DB_URL).then(()=>{console.log("DataBase Connected")}).catch((err)=>{console.log(err)})
}

getCon()

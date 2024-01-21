const mongoose  = require("mongoose")


const getCon = async(req,res) =>{ 
    const response = await mongoose.connect("mongodb://localhost:27017/ecom_api").then(()=>{console.log("DataBase Connected")}).catch((err)=>{console.log(err)})
}

getCon()

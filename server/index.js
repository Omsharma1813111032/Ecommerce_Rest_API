require("dotenv").config()
const express = require("express")
const app  = express()
app.use(express.json())
const cors = require("cors")
app.use(cors())

const getCon = require("./DB/DBcon")

const Authrouter = require("./routes/authRoutes")
app.use("/api/user",Authrouter)



app.listen(process.env.PORT,(req,res)=>{
    console.log("Server Running at ", process.env.PORT)
})
const express = require("express")
const router =  express.Router()
const authController = require("../controller/userController")



router.post("/register",authController.register)


module.exports = router;
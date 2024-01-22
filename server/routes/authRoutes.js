const express = require("express")
const router =  express.Router()
const authController = require("../controller/userController")



router.post("/register",authController.register)
router.post("/login",authController.login)
router.get("/all-user",authController.getAllUser)
router.get("/:id",authController.getUser)
router.get("/delete/:id",authController.deleteUser)


module.exports = router;
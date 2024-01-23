const express = require("express")
const router =  express.Router()
const authController = require("../controller/userController")
const { authMiddleware } = require("../middleware/authMiddleware")



router.post("/register",authController.register)
router.post("/login",authController.login)
router.get("/all-user", authMiddleware, authController.getAllUser)
router.get("/:id", authMiddleware ,authController.getUser)
router.get("/delete/:id", authMiddleware, authController.deleteUser)
router.post("/update/:id", authMiddleware, authController.updateUser)


module.exports = router;
const express = require("express")
const router =  express.Router()
const authController = require("../controller/userController")
const { authMiddleware, isAdmin } = require("../middleware/authMiddleware")



router.post("/register",authController.register)
router.post("/login",authController.login)
router.get("/all-user", authMiddleware, isAdmin, authController.getAllUser)
router.get("/:id", authMiddleware, isAdmin, authController.getUser)
router.get("/delete/:id", authMiddleware, isAdmin, authController.deleteUser)
router.post("/update/:id", authMiddleware, isAdmin, authController.updateUser)


module.exports = router;
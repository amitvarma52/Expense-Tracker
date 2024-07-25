const express=require("express")
const {loginController,registerController}=require('../controller/userController.js')

const router=express.Router()
// login
router.post("/login",loginController)
//register
router.post("/register",registerController)


module.exports=router
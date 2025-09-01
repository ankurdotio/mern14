const express = require('express');
const authController = require("../controllers/auth.controller")


const router = express.Router();


/* POST /api/auth/user/register */
router.post("/user/register", authController.registerUser)
router.post("/user/login", authController.loginUser)


router.post("/seller/register", authController.registerSeller)
router.post("/seller/login", authController.loginSeller)

module.exports = router;
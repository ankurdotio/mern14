const express = require('express');
const authController = require("../controllers/auth.controller")


const router = express.Router();


/* POST /api/auth/user/register */
router.post("/user/register", authController.registerUser)


router.post("/user/login", authController.loginUser)

module.exports = router;
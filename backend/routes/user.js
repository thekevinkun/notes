const express = require("express");

const { loginUser, signupUser } = require("../controllers/userController");


const router = express.Router();

// Login route
router.post("/login", loginUser);

// SignUp route
router.post("/signup", signupUser);


module.exports = router;
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");


// Create jwtoken
const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, {expiresIn: "120s"});
}

// Login user
const loginUser = async (req, res) => {
    const username = req.body.username.toLowerCase();
    const password = req.body.password;

    try {
        const user = await User.login(username, password);

        // Crate a token
        const token = createToken(user._id);

        res.status(200).json({name: user.name, token});
    } catch (error) {
        res.status(400).json({error: error.message, emptyField: error.emptyField});
    }
}

// signup user
const signupUser = async (req, res) => {
    const name = req.body.name.trim();
    const username = req.body.username.toLowerCase();
    const email = req.body.email.toLowerCase();
    const password = req.body.password;

    try {
        const user = await User.signup(name, username, email, password);

        // Crate a token
        const token = createToken(user._id);

        res.status(200).json({name: user.name, token});
    } catch (error) {
        res.status(400).json({error: error.message, emptyField: error.emptyField});
    }
}


module.exports = {
    loginUser,
    signupUser
};
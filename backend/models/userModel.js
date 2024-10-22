const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})


// Static login method
userSchema.statics.login = async function(username, password) {
    // Validate username
    if (!username) {
        throw {
            message: "Please enter your username",
            emptyField: "username",
            error: new Error()
        }
    }

    const user = await this.findOne({ username });
    if (!user) {
        throw {
            message: "Username is not exist",
            emptyField: "username",
            error: new Error()
        }
    }

    // Validate password
    if (!password) {
        throw {
            message: "Please enter your password",
            emptyField: "password",
            error: new Error()
        }
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw {
            message: "You enter incorrect password",
            emptyField: "password",
            error: new Error()
        }
    }

    return user;
}

// Static signup method
userSchema.statics.signup = async function(name, username, email, password) {
    // Validate name
    if (!name) {
        throw {
            message: "Please enter your name",
            emptyField: "name",
            error: new Error()
        }
    } else if (!validator.isAlpha(name, ["en-US"], { ignore: " " })) {
        throw {
            message: "Are you sure you entered your name correctly?",
            emptyField: "name",
            error: new Error()
        }
    }

    // Validate username
    if (!username) {
        throw {
            message: "Please enter your username",
            emptyField: "username",
            error: new Error()
        }
    } else if (username.length < 5) {
        throw {
            message: "Use 5 or more characters for your username",
            emptyField: "username",
            error: new Error()
        }
    } else if (!validator.matches(username, "^[a-zA-Z0-9_\.\-]*$")) {
        throw {
            message: "Username should only use alphabets, numbers, and (._-) as characters",
            emptyField: "username",
            error: new Error()
        }
    } 
    
    const usernameExist = await this.findOne({ username });
    if (usernameExist) {
        throw {
            message: "Username is not available",
            emptyField: "username",
            error: new Error()
        }
    }
    
    // Validate email
    if (!email) {
        throw {
            message: "Please enter your email",
            emptyField: "email",
            error: new Error()
        }
    } else if (!validator.isEmail(email)) {
        throw {
            message: "Email is not valid",
            emptyField: "email",
            error: new Error()
        }
    }

    const emailExist = await this.findOne({ email });
    if (emailExist) {
        throw {
            message: "Email is already in use",
            emptyField: "email",
            error: new Error()
        }
    }

    // Validate password
    if (!password) {
        throw {
            message: "Please enter your password",
            emptyField: "password",
            error: new Error()
        }
    } else if (password.length < 8) {
        throw {
            message: "Use 8 or more characters for your password",
            emptyField: "password",
            error: new Error()
        }
    } else if (!validator.isStrongPassword(password, {
        minLength: 8,
        minUppercase: 0,
        minNumbers: 1,
        minSymbols: 0,
    })) {
        throw {
            message: "Please choose a stronger password. Try a mix of letters, numbers, and symbols",
            emptyField: "password",
            error: new Error()
        }
    }

    // Hash user password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({ name, username, email, password: hash});

    return user;
}

module.exports = mongoose.model("User", userSchema);
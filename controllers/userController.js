const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { use } = require('../routes/contactRoutes');
const { json } = require('body-parser');

//@desc Register a User
//@route POST /api/contacts
//@access public

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        // res.status(500);
        throw new Error("All Field are mandatery");
    }
    const userAvailable = await User.findOne({ email });
    console.log("here pass");

    if (userAvailable) {
        res.status(400);
        console.log("here pass");
        throw new Error("User allready registerd ");
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hash Password: ", hashedPassword);
    const user = await User.create({
        username,
        email,
        password: hashedPassword,
    })

    console.log(`User created ${user}`);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    }
    else {
        res.status(400);
        throw new Error("User data us not valid")
    }
    res.json({ message: "Register the user" });
});

//@desc Login a User
//@route POST /api/contacts
//@access public

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All field are mandatery");
    }
    const user = await User.findOne({ email });
    //compare pass
    if (user && bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id,
            }
        },
            process.env.ACCESS_TOKEN_SECRET,
        );
        res.status(200).json({ accessToken });
    }
    res.json({ message: "Login the user" });
});

//@desc Current User
//@route POST /api/contacts
//@access privat

const currentUser = asyncHandler(async (req, res) => {

    res.json({ message: "Current User Information" });
});

module.exports = { registerUser, loginUser, currentUser };

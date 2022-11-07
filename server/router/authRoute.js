const router = require("express").Router();
const bcrypt = require("bcryptjs");

const User = require("../models/UserModel");

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (password === undefined || email === undefined) {
        return res
            .status(400)
            .json({ msg: "Please Fill all fields of the form" });
    }

    try {
        const userExists = await User.findOne({ email: email });

        if (userExists) {
            const valid = await bcrypt.compare(password, userExists.password);
            if (valid) {          
                
                return res
                    .status(200)
                    .json({
                        msg: "Login Successful",
                        userExists,
                        token: userExists._id,
                    });
            } else {
                return res.status(400).json({ msg: "Incorrect Password" });
            }
        } else {
            return res.status(404).json({ msg: "User does not exists" });
        }
    } catch (err) {
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});

router.post("/register", async (req, res) => {
    const { username, email, password } = req.body;
    console.log(
        `Username: ${username}\tEmail: ${email}\tPassword: ${password}`
    );
    if (
        password === undefined ||
        email === undefined ||
        username === undefined
    ) {
        return res
            .status(400)
            .json({ msg: "Please Fill all fields of the form" });
    }

    if (password.length < 6) {
        return res.status(400).json({ msg: "Password is too short" });
    }

    const user = await User.findOne({ email: email });
    if (user) {
        return res.status(400).json({ msg: "User Already Exists" });
    }

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new User({
            username: username,
            email: email,
            password: hashedPassword,
        });

        const savedUser = await user.save();

        return res
            .status(201)
            .json({ msg: "User Registration Successful", savedUser });
    } catch (err) {
        res.status(500).json({ msg: "Internal Server Error", err });
    }
});

module.exports = router;

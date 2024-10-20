const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Account } = require("../../model");

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const User = await Account.findOne({ email });
        if (!User) {
            throw new Error("User Not Found");
        }
        const isPassword = await bcrypt.compare(password, User.password);
        if (!isPassword) {
            throw new Error("Invalid email or password");
        }
        res.status(200).json({ success: true, message: "User found", User });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;

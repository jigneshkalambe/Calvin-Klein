const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Account } = require("../../model");

router.post("/", async (req, res) => {
    try {
        const { email, password } = req.body;
        const User = await Account.findOne({ email });
        const isPassword = await bcrypt.compare(password, User.password);
        if (!User) {
            return res.status(404).json({ success: false, message: "User not found" });
        }
        if (!isPassword) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }
        res.status(200).json({ success: true, message: "User found", User });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
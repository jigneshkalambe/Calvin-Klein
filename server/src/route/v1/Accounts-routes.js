const express = require("express");
const { Account } = require("../../model");
const accountValidation = require("../../validation/Accountvalidation");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const Accounts = await Account.find();
        if (!Accounts) {
            throw new Error("No Accounts found");
        }
        res.status(200).json(Accounts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/createAccount", accountValidation, async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const Users = await Account.create({ firstName, lastName, email, password });
        if (!Users) {
            throw new Error("Users info didnt get");
        }
        res.status(200).json({
            success: true,
            message: "Account created successfully",
            Users,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;

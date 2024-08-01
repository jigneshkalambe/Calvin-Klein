const express = require("express");
const { Accouts } = require("../../model");
const accoutValidation = require("../../validation/Accoutvalidation");
const router = express.Router();

router.post("/createAccout", accoutValidation, async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const Users = await Accouts.create({ firstName, lastName, email, password });
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

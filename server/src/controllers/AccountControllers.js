const Account = require("../model/CreateAccount-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createAccount = async (req, res) => {
    try {
        const { firstName, lastName, email, password, products } = req.body;

        const nameExits = await Account.findOne({ firstName, lastName });
        if (nameExits) {
            return res.status(400).json({ message: "Name already exists" });
        }

        const emailExits = await Account.findOne({ email });
        if (emailExits) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new Account({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            products: products || [],
        });

        const Users = await newUser.save();

        const payload = { userID: Users._id, email: Users.email };
        const token = jwt.sign(payload, "SECRET");

        if (!Users) {
            throw new Error("Users info didnt get");
        }
        res.status(200).json({
            success: true,
            message: "Account created successfully",
            Users,
            token,
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const AccountLists = async (req, res) => {
    try {
        const Accounts = await Account.find().populate("products");

        if (!Accounts) {
            throw new Error("No Accounts found");
        }
        res.status(200).json({ Accounts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createAccount, AccountLists };

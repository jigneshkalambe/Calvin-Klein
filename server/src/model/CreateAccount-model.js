const mongoose = require("mongoose");

const Accounts_Schema = mongoose.Schema({
    firstName: {
        type: String,
        trim: true,
        required: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    password: {
        type: String,
        trim: true,
        required: true,
    },
    number: {
        type: Number,
        required: false,
    },
    gender: {
        type: String,
        required: false,
        trim: true,
    },
    products: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Item",
        },
    ],
    prevOrders: [
        {
            orderDate: { type: Date, default: Date.now },
            products: [
                {
                    type: mongoose.Types.ObjectId,
                    ref: "Item",
                },
            ],
        },
    ],
});

const Account = mongoose.model("Account", Accounts_Schema);

module.exports = Account;

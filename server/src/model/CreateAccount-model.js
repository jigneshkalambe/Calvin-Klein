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
    wishlist: [
        {
            id: { type: Number, required: true },
            title: { type: String, required: false },
            old_price: { type: Number, required: false },
            new_price: { type: Number, required: false },
            category: { type: String, required: false },
            discount: { type: Number, required: false },
            line: { type: String, required: false },
            desc: { type: String, required: false },
            img01: { type: String, required: false },
            img02: { type: String, required: false },
            img03: { type: String, required: false },
            img04: { type: String, required: false },
        },
    ],
    wishlistProducts: [
        {
            productId: { type: Number, required: true },
            isAddedToWishlist: { type: Boolean, default: false, required: false },
        },
    ],
});

const Account = mongoose.model("Account", Accounts_Schema);

module.exports = Account;

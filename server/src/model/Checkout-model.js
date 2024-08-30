const mongoose = require("mongoose");

const CheckOutSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
        },
        Address: {
            type: String,
            required: true,
            trim: true,
        },
        Apartment: {
            type: String,
            required: false,
            trim: true,
        },
        City: {
            type: String,
            required: true,
            trim: true,
        },
        State: {
            type: String,
            required: true,
            trim: true,
        },
        ZipCode: {
            type: String,
            required: true,
            trim: true,
        },
        Email: {
            type: String,
            required: true,
            trim: true,
        },
        PhoneNumber: {
            type: Number,
            required: true,
            default: 0,
        },
    },
    { versionKey: false }
);

const CheckOut = mongoose.model("Checkout", CheckOutSchema);
module.exports = CheckOut;

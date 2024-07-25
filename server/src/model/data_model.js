const mongoose = require("mongoose");

const item_Schema = mongoose.Schema({
    id: { type: Number, required: true, unique: true },
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
    quantity: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
});

const Item = mongoose.model("Item", item_Schema);

module.exports = Item;

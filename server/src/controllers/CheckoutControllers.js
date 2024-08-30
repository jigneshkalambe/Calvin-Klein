const CheckOut = require("../model/Checkout-model");

const AddtoCheckout = async (req, res) => {
    try {
        const newData = await CheckOut.create(req.body);
        if (!newData) {
            throw new Error("Checkout data didnt get!");
        }
        res.status(200).json({ newData });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { AddtoCheckout };

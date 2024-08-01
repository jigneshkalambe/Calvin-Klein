const express = require("express");
const { Data } = require("../../model");
const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const newItem = await Data.find();
        res.json(newItem);
    } catch (error) {
        res.status(400).json({ message: "Bad request" });
    }
});

router.post("/", async (req, res) => {
    const { id, desc, img01, img02, img03, img04, line, title, new_price, discount, old_price } = req.body;
    try {
        let item = await Data.findOne({ id });
        if (item) {
            // item.id = id;
            item.desc = desc;
            item.img01 = img01;
            item.img02 = img02;
            item.img03 = img03;
            item.img04 = img04;
            item.line = line;
            item.title = title;
            item.new_price = new_price;
            item.discount = discount;
            item.old_price = old_price;
            item.quantity += 1;
            item.totalPrice += new_price;
            await Data.create(item);
        } else {
            item = await Data.create({
                id,
                desc,
                img01,
                img02,
                img03,
                img04,
                line,
                title,
                new_price,
                discount,
                old_price,
                quantity: 1,
                totalPrice: new_price,
            });
            await Data.create(item);
        }
        res.json(item);
        // const newItem = await Data.create(req.body);
    } catch (error) {
        res.status(400).json({ message: "Bad request" });
    }
});

router.post("/remove", async (req, res) => {
    const { id } = req.body;
    try {
        let exitingItems = await Data.findOne({ id });
        // console.log(exitingItems.quantity);

        if (!exitingItems) {
            res.json({ message: "item not found" });
        }

        if (exitingItems.quantity === 1) {
            await Data.deleteOne({ id });
            // await Item.create()
        } else {
            exitingItems.quantity -= 1;
            exitingItems.totalPrice -= exitingItems.new_price;
            await exitingItems.save();
            res.json(exitingItems);
        }
    } catch (error) {}
});

module.exports = router;

const Item = require("../model/data_model");
const Account = require("../model/CreateAccount-model");
const productLists = async (req, res) => {
    try {
        const newItem = await Item.find();
        res.json(newItem);
    } catch (error) {
        res.status(400).json({ message: "Bad request" });
    }
};

const productsAdd = async (req, res) => {
    const { id, desc, img01, img02, img03, img04, line, title, new_price, discount, old_price } = req.body;
    try {
        let account = await Account.findById(req.body.accId);
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        let item = await Item.findOne({ id });
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
            await item.save();
        } else {
            item = await Item.create({
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
        }
        const latestIndex = account.products.findIndex((productsId) => productsId.equals(item._id));
        // console.log(latestIndex);

        if (latestIndex !== -1) {
            account.products[latestIndex] = item._id;
        } else {
            account.products.push(item._id);
        }

        await account.save();
        res.json(item);
    } catch (error) {
        res.status(400).json({ message: "Bad request" });
    }
};

const productsRemove = async (req, res) => {
    const { id } = req.body;
    try {
        let exitingItems = await Item.findOne({ id });

        if (!exitingItems) {
            throw new Error("Item Not Found");
        }

        if (exitingItems.quantity === 1) {
            await Item.deleteOne({ id });
        } else {
            exitingItems.quantity -= 1;
            exitingItems.totalPrice -= exitingItems.new_price;
            await exitingItems.save();
            res.json(exitingItems);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { productLists, productsAdd, productsRemove };

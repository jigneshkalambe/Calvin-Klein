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
    try {
        const { id, accId } = req.body;

        if (!id) {
            throw new Error("Missing required parameters: id");
        }

        if (!accId) {
            throw new Error("Missing required parameters: accId");
        }

        const userAcc = await Account.findById(accId).populate("products");

        if (!userAcc) {
            throw new Error("Account not found");
        }
        // console.log("User account:", userAcc);

        const item = await userAcc.products.find((product) => product.id == id);

        // console.log("Item to remove:", item);
        if (!item) {
            throw new Error("Item not found");
        }

        if (item.quantity === 1) {
            userAcc.products = userAcc.products.filter((product) => product.id !== id);
        } else {
            item.quantity--;
            item.totalPrice = Number(item.totalPrice) - Number(item.new_price);
        }

        await item.save();
        await userAcc.save();
        res.status(200).json({ message: "Item processed successfully" });
    } catch (error) {
        console.error("Error during product removal:", error.message);
        res.status(400).json({ message: error.message });
    }
};

const productsDelete = async (req, res) => {
    try {
        const { id, accId } = req.body;
        const userAccount = await Account.findById(accId).populate("products");

        if (!userAccount) {
            throw new Error("acc not found");
        }

        const product = await userAccount.products.find((product) => product.id == id);

        if (product) {
            product.quantity = 0;
            userAccount.products = userAccount.products.filter((products) => products.id !== product.id);
        }

        await product.save();
        await userAccount.save();
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ message: error.message });
    }
};

const prevOrdersUpload = async (req, res) => {
    const { accId } = req.body;
    try {
        const userAccount = await Account.findById(accId).populate("products");
        if (!userAccount) {
            throw new Error("Account not found");
        }

        if (userAccount.products.length === 0) {
            throw new Error("No products in the cart to move to previous orders");
        }

        userAccount.prevOrders.push({
            products: userAccount.products.map((val) => {
                return val._id;
            }),
        });

        userAccount.products = [];
        await userAccount.save();

        res.status(200).json({ message: "Order successfully moved to previous orders" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { productLists, productsAdd, productsRemove, productsDelete, prevOrdersUpload };

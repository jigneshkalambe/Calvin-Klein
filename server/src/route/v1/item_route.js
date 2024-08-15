const express = require("express");
const router = express.Router();
const { productLists, productsAdd, productsRemove } = require("../../controllers/ProductControllers");

router.get("/", productLists);

router.post("/", productsAdd);

router.post("/remove", productsRemove);

module.exports = router;

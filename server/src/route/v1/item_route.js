const express = require("express");
const router = express.Router();
const { productLists, productsAdd, productsRemove, productsDelete, prevOrdersUpload } = require("../../controllers/ProductControllers");

router.get("/", productLists);
router.post("/", productsAdd);
router.post("/remove", productsRemove);
router.post("/delete", productsDelete);
router.post("/prevOrders", prevOrdersUpload);

module.exports = router;

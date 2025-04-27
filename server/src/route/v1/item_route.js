const express = require("express");
const router = express.Router();
const { productLists, productsAdd, productsRemove, productsDelete, prevOrdersUpload, AddWishlistProduct, wishlistProductsRemove, clearAllWishlist } = require("../../controllers/ProductControllers");

router.get("/", productLists);
router.post("/", productsAdd);
router.post("/remove", productsRemove);
router.post("/delete", productsDelete);
router.post("/prevOrders", prevOrdersUpload);
router.post("/AddWishlistProduct", AddWishlistProduct);
router.post("/DeleteWishlistProduct", wishlistProductsRemove);
router.post("/clearAllWishlist", clearAllWishlist);

module.exports = router;

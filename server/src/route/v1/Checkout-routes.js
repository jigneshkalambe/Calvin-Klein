const express = require("express");
const { AddtoCheckout } = require("../../controllers/CheckoutControllers");
const router = express.Router();

router.post("/", AddtoCheckout);

module.exports = router;

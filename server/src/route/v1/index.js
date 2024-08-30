const express = require("express");
const router = express();
const DataRoute = require("./item_route");
const AccountRoute = require("./Accounts-routes");
const loginRoute = require("./Login-routes");
const checkoutRoute = require("./Checkout-routes");

router.use("/data", DataRoute);
router.use("/account", AccountRoute);
router.use("/login", loginRoute);
router.use("/checkout", checkoutRoute);

module.exports = router;

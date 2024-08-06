const express = require("express");
const router = express();
const DataRoute = require("./item_route");
const AccountRoute = require("./Accounts-routes");

router.use("/data", DataRoute);
router.use("/account", AccountRoute);

module.exports = router;

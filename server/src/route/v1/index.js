const express = require("express");
const router = express();
const DataRoute = require("./item_route");
const AccountRoute = require("./Accounts-routes");
const loginRoute = require("./Login-routes");

router.use("/data", DataRoute);
router.use("/account", AccountRoute);
router.use("/login", loginRoute);

module.exports = router;

const express = require("express");
const router = express();
const DataRoute = require("./item_route");
const AccountRoute = require("./Accouts-routes");

router.use("/data", DataRoute);
router.use("/accout", AccountRoute);

module.exports = router;

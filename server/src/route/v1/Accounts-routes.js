const express = require("express");
const router = express.Router();
const accountValidation = require("../../validation/Accountvalidation");
const { createAccount, AccountLists, AccountUpdate, passUpdate } = require("../../controllers/AccountControllers");

router.get("/", AccountLists);
router.post("/createAccount", accountValidation, createAccount);
router.post("/updateAccount", AccountUpdate);
router.post("/passUpdate", passUpdate);

module.exports = router;

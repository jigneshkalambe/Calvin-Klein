const express = require("express");
const router = express.Router();
const accountValidation = require("../../validation/Accountvalidation");
const { createAccount, AccountLists, AccountUpdate } = require("../../controllers/AccountControllers");

router.get("/", AccountLists);
router.post("/createAccount", accountValidation, createAccount);
router.post("/updateAccount", AccountUpdate);

module.exports = router;

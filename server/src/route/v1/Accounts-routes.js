const express = require("express");
const router = express.Router();
const accountValidation = require("../../validation/Accountvalidation");
const { createAccount, AccountLists } = require("../../controllers/AccountControllers");

router.get("/", AccountLists);
router.post("/createAccount", accountValidation, createAccount);

module.exports = router;

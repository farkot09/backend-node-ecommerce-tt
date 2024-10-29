const express = require("express");
const router = express.Router();
const MailController = require("../controllers/mailController");

router.post("/mailMasive", MailController);

module.exports = router;
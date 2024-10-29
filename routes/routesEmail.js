const express = require("express");
const router = express.Router();
const MailController = require("../controllers/mailController");

router.post("/sendMasiveMail", MailController.sendMasiveMail);
router.post('/mailMasiveBatch', MailController.sendMasiveMailBatch);

module.exports = router;
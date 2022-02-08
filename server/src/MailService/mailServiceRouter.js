const router = require("express").Router();
const MailService = require("./MailServiceController");
router.route("/:email/otpCode").put(MailService.sendMailOtpcode);
router.route("/:email/context").put(MailService.sendMailContext);
router.route("/OrderStatus").put(MailService.sendMailOrderStatust);
router.route("/:otp/confrimOtp").post(MailService.conFirmOtpCode);
router.route("/editPassword").put(MailService.editPassword);
router.route("/:email/conFirmEmail").post(MailService.conFirmEmail);


module.exports = router;
const router = require("express").Router();
const secretaryCtrl = require("../Controllers/secretaryController");
router.route("/login").post(secretaryCtrl.login);
router.route("/loginEmail").post(secretaryCtrl.loginEmail);
router.route("/getuser").get(secretaryCtrl.getUser);
router.route("/edituser").post(secretaryCtrl.EditUser);
router.route("/editPassWord").post(secretaryCtrl.EditPassword);
module.exports = router;

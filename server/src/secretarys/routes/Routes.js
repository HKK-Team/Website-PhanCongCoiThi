const router = require("express").Router();
const GiangVienCtrl = require("../Controllers/GiangVienController");
const MonThiCtrl = require("../Controllers/MonThiController");

router.route("/giangvien").post(GiangVienCtrl.check);
router.route("/getGiangVien").get(GiangVienCtrl.getGiangVien);
router.route("/editGiangVien").put(GiangVienCtrl.editGiangVien);
router.route("/createGiangVien").post(GiangVienCtrl.createGiangVien);
router.route("/deleteGiangVien/:id").delete(GiangVienCtrl.deleteGiangVien);

router.route("/monthi").post(MonThiCtrl.check);
router.route("/getMonthi").get(MonThiCtrl.getMonThi);
module.exports = router;

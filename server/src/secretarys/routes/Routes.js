const router = require("express").Router();
const GiangVienCtrl = require("../Controllers/GiangVienController");
const MonThiCtrl = require("../Controllers/MonThiController");
const lichThiCtrl = require("../Controllers/LichThiController");
const namHocCtrl = require("../Controllers/namHocController");

router.route("/giangvien").post(GiangVienCtrl.check);
router.route("/getGiangVien").get(GiangVienCtrl.getGiangVien);
router.route("/editGiangVien").put(GiangVienCtrl.editGiangVien);
router.route("/createGiangVien").post(GiangVienCtrl.createGiangVien);
router.route("/deleteGiangVien/:id").delete(GiangVienCtrl.deleteGiangVien);

router.route("/monthi").post(MonThiCtrl.check);
router.route("/getMonthi").get(MonThiCtrl.getMonThi);
router.route("/editMonthi").put(MonThiCtrl.editMonThi);
router.route("/createMonthi").post(MonThiCtrl.createMonThi);
router.route("/deleteMonthi/:id").delete(MonThiCtrl.deleteMonThi);

router.route("/createLichthi").post(lichThiCtrl.createLichThi);
router.route("/getLichthi").get(lichThiCtrl.getLichThi);
router.route("/editLichthi").put(lichThiCtrl.eidtLichThi);
router.route("/deleteLichthi/:id").delete(lichThiCtrl.deleteLichThi);
router.route("/deleteAllLichThi/:key").delete(lichThiCtrl.deleteAllLichThi);
router.route("/publicLichThi/:key,:isChecked").put(lichThiCtrl.publicLichThi);

router.route("/getNamHoc").get(namHocCtrl.getNamHoc);

module.exports = router;

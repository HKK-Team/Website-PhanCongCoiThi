const tieuLuanCtrl = require("./../Controllers/TieuluanController");
const router = require("express").Router();

router.route("/createTieuLuan").post(tieuLuanCtrl.Create);
router.route("/getTieuLuan").get(tieuLuanCtrl.getSubjectTieuLuan);
router.route("/editTieuLuan").put(tieuLuanCtrl.editTieuLuan);
router.route("/successTieuLuan").put(tieuLuanCtrl.successTieuLuan);
router.route("/cancelTieuLuan").put(tieuLuanCtrl.cancelTieuLuan);
router.route("/suggestTieuLuan").put(tieuLuanCtrl.suggestTieuLuan);
router.route("/deleteTieuLuan/:id").delete(tieuLuanCtrl.deleteTieuLuan);

module.exports = router;

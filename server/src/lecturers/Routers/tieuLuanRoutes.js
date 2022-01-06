const tieuLuanCtrl = require('./../Controllers/TieuluanController');
const router = require("express").Router();

router.route("/createTieuLuan").post(tieuLuanCtrl.Create);
router.route("/getTieuLuan").get(tieuLuanCtrl.getSubjectTieuLuan);
router.route("/editTieuLuan").put(tieuLuanCtrl.editTieuLuan);


module.exports = router;
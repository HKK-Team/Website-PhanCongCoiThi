const router = require("express").Router();
const excelController = require("./excelController");

router.route("/dowloadingExcelFIle/").get(excelController.dowloadingExcel);
router.route("/getDataExcelFIle/").put(excelController.getData);

module.exports = router;
const router = require("express").Router();
const scheduleCrtl = require("../controllers/scheduleController");

//router api schedule
router.get('/schedule', scheduleCrtl.getschedule)


module.exports = router
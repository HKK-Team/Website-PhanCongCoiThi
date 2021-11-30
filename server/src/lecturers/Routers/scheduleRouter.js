const router = require("express").Router();
const scheduleCrtl = require("../Controllers/scheduleController");

//router api schedule
router.get('/schedule', scheduleCrtl.getschedule)


module.exports = router
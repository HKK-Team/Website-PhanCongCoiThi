const router = require('express').Router()
const lecturerCtrl = require('../Controllers/lecturerController')
router.route('/lecturer')
    .post(lecturerCtrl.login)
module.exports = router
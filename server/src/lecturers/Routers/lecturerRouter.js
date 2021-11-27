const router = require('express').Router();
const lecturerCtrl = require('../Controllers/lecturerController');
router.route('/login')
    .post(lecturerCtrl.login)
router.route('/getuser')
    .get(lecturerCtrl.GetUser)
module.exports = router
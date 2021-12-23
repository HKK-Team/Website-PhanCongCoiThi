const router = require('express').Router();
const secretaryCtrl = require('../Controllers/secretaryController');
router.route('/login')
    .post(secretaryCtrl.login)
router.route('/getuser')
    .get( secretaryCtrl.getUser)
router.route('/edituser')
    .post( secretaryCtrl.EditUser)
module.exports = router

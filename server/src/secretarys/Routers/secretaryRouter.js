const router = require('express').Router();
const secretaryCtrl = require('../Controllers/secretaryController');
router.route('/login')
    .post(secretaryCtrl.login)
router.route('/getuser')
    .get( secretaryCtrl.getUser)
module.exports = router

const router = require('express').Router();
const secretaryCtrl = require('../Controllers/secretaryController');
const auth = require('../Middlewares/auth');
router.route('/login')
    .post(secretaryCtrl.login)
router.get('/refresh_token',secretaryCtrl.refreshToken)
router.route('/infor')
    .get( auth,  secretaryCtrl.getUser)
router.route('/logout')
    .get(secretaryCtrl.logout)
module.exports = router

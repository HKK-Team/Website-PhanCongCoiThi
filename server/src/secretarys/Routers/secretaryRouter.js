const router = require('express').Router()
const secretary = require('../Controllers/secretaryControllre')
router.route('/secretary')
    .post(secretary.login)
module.exports = router

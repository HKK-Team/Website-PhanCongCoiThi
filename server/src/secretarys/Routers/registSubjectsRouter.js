const router = require("express").Router();
const rgSubjectsCrtl = require("../controllers/registSubjectController");

//router api register for subjects
router.get('/rgsubjects', rgSubjectsCrtl.getdata)


module.exports = router
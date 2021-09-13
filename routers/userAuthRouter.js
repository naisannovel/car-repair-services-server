const router = require('express').Router();
const { signUp,login,updateUserRole } = require('../controllers/userAuthController');
const authorize = require('../middlewares/authorize');
const admin = require('../middlewares/admin');

router.route('/signup').post(signUp)
router.route('/login').post(login)
router.route('/update/role').put([authorize,admin],updateUserRole)

module.exports = router;
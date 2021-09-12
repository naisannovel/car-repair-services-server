const router = require('express').Router();
const authorize = require('../middlewares/authorize');
const admin = require('../middlewares/admin');
const upload = require('../multerFileUpload/multerFileUploadConfig');
const { addServiceRouter } = require('../controllers/serviceController');


router.route('/add')
    .post([authorize,admin,upload],addServiceRouter)

module.exports = router;
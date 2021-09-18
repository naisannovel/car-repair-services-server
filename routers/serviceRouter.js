const router = require('express').Router();
const authorize = require('../middlewares/authorize');
const admin = require('../middlewares/admin');
const upload = require('../multerFileUpload/multerFileUploadConfig');
const { addService, fetchAllServices,deleteService, updateServicePrice } = require('../controllers/serviceController');


router.route('/service')
    .get(fetchAllServices)
    .post([authorize,admin,upload],addService)

router.route('/service/:id')
    .put([authorize,admin],updateServicePrice)
    .delete([authorize,admin],deleteService)

module.exports = router;
const router = require('express').Router();
const authorize = require('../middlewares/authorize');
const admin = require('../middlewares/admin');
const upload = require('../multerFileUpload/multerFileUploadConfig');
const { addService, fetchAllServices,deleteService, updateServicePrice, fetchAllServicesAdmin } = require('../controllers/serviceController');


router.route('/service')
    .get(fetchAllServices)
    .get(fetchAllServicesAdmin)
    .post([authorize,admin],addService)

router.route('/service/all')
    .get(fetchAllServicesAdmin)

router.route('/service/:id')
    .put([authorize,admin],updateServicePrice)
    .delete([authorize,admin],deleteService)

module.exports = router;
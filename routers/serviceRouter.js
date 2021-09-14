const router = require('express').Router();
const authorize = require('../middlewares/authorize');
const admin = require('../middlewares/admin');
const upload = require('../multerFileUpload/multerFileUploadConfig');
const { addService, fetchAllServices,deleteService } = require('../controllers/serviceController');
const { addReview, getReview } = require('../controllers/reviewController');


router.route('/service')
    .get(fetchAllServices)
    .post([authorize,admin,upload],addService)

router.route('/service/:id')
    .delete([authorize,admin],deleteService)

router.route('/review')
    .get(getReview)
    .post([authorize,upload],addReview)

module.exports = router;
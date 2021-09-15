const router = require('express').Router();
const authorize = require('../middlewares/authorize');
const upload = require('../multerFileUpload/multerFileUploadConfig');
const { addReview, getReview } = require('../controllers/reviewController');

router.route('/')
    .get(getReview)
    .post([authorize,upload],addReview)

module.exports = router;
const router = require('express').Router();
const upload = require('../multerFileUpload/multerFileUploadConfig');
const { addServiceRouter } = require('../controllers/serviceController');


router.route('/add')
    .post(upload,addServiceRouter)

module.exports = router;
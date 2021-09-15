const router = require('express').Router();
const authorize = require('../middlewares/authorize');
const { addCart,getCartItem } = require('../controllers/cartController');


router.route('/')
    .get(authorize,getCartItem)

router.route('/:id')
    .post(authorize,addCart)

module.exports = router;
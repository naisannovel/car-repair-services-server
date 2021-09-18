const router = require('express').Router();
const authorize = require('../middlewares/authorize');
const { inCart,addCart,getCartItem } = require('../controllers/cartController');


router.route('/')
    .get(authorize,getCartItem)

router.route('/:id')
    .get(authorize,inCart)
    .post(authorize,addCart)

module.exports = router;
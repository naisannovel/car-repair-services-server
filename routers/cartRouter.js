const router = require('express').Router();
const authorize = require('../middlewares/authorize');
const admin = require('../middlewares/admin');
const { inCart,addCart,getCartItem, getAllCartItem,cartItemUpdate } = require('../controllers/cartController');


router.route('/')
    .get(authorize,getCartItem)

router.route('/:id')
    .get(authorize,inCart)
    .post(authorize,addCart)
    .put([authorize,admin],cartItemUpdate)

router.route('/all/item')
    .get([authorize,admin],getAllCartItem)

module.exports = router;
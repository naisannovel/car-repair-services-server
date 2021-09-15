const { CartModel } = require('../models/cartModel');


module.exports.addCart = async (req,res)=>{
    const userId = req.user._id;
    const serviceId = req.params.id;
    const item = await CartModel.findOne({
        user: userId,
        service: serviceId,
    });
    if (item) return res.status(400).send("service already exists in your Cart!");

    let cartItem = new CartModel({ user: userId,service: serviceId });
   try{
    const result = await cartItem.save();
    res.status(201).send({
        message: "Added to cart successfully!",
        data: result,
    });
   }catch(err){
       res.status(400).send(err)
   }
}

module.exports.getCartItem = async (req, res) => {
    const cartItems = await CartModel.find({
        user: req.user._id
    })
        .populate('user','name email')
        .populate('service','name price')
    return res.status(200).send(cartItems);
}
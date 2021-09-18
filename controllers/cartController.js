const { CartModel } = require("../models/cartModel");

module.exports.inCart = async (req, res) => {
    const userId = req.user._id;
    const serviceId = req.params.id;

        const result = await CartModel.findOne({
            user: userId,
            "myService.service": serviceId,
        });
        
        if (result) return res.status(400).send("service already exists in your Cart!");
        else res.send(result)

}

module.exports.addCart = async (req, res) => {
    const userId = req.user._id;
    const serviceId = req.params.id;
    const userCartItem = await CartModel.findOne({
        user: userId,
    });

    if (userCartItem !== null) {

        try{
            const item = await CartModel.updateOne({
                user: userId,
            }, {
                $push: {
                    myService: {
                        service: serviceId,
                    },
                },
            });
            res.status(201).send('successfully added in your cart');
        }catch(err){
            res.status(400).send(err);
        }
    } else {
        let cartItem = new CartModel({
            user: userId,
            myService: [{
                service: serviceId,
            }],
        });
        try {
            const result = await cartItem.save();
            res.status(201).send('successfully added in your cart');
        } catch (err) {
            res.status(400).send(err);
        }
    }
};

module.exports.getCartItem = async (req, res) => {
    const cartItems = await CartModel.find({
            user: req.user._id,
        })
        .populate("user", "name email")
        .populate("myService.service");
    if(cartItems.length){
        return res.status(200).send(cartItems);
    }
    return res.status(200).send('don\'t take any service');
};

module.exports.getAllCartItem = async (req,res) => {
    const cartItems = await CartModel.find()
    .populate("user", "name email")
    .populate("myService.service");
    if(cartItems.length){
    return res.status(200).send(cartItems);
    }
    return res.status(200).send('don\'t take any service');
};

// module.exports.addCart = async (req,res)=>{
//     const userId = req.user._id;
//     const serviceId = req.params.id;
//     const item = await CartModel.findOne({
//         user: userId,
//         service: serviceId,
//     });
//     if (item) return res.status(400).send("service already exists in your Cart!");

//     let cartItem = new CartModel({ user: userId,service: serviceId });
//    try{
//     const result = await cartItem.save();
//     res.status(201).send(result);
//    }catch(err){
//        res.status(400).send(err)
//    }
// }